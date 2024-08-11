import { expect as expect$0 } from "chai";
import { randomUUID as uuid } from "crypto";
import * as mongodb from "mongodb";
import Locks from "../../lib/locks.js";
import retry from "../retry.js";

const { MongoClient } = mongodb;
const expect = { expect: expect$0 }.expect;
describe('Locks', () => {
    /**
     * @type {Locks}
     */
    let locks, client;
    before(() => {
        client = new MongoClient('mongodb://127.0.0.1:27021/?replicaSet=rs0');
        locks = new Locks({ client });
    });
    before(async () => {
        return retry(async () => {
            const indexes = await client.db('test').collection('_locks').listIndexes().toArray();
            expect(indexes).to.have.length(3);
        });
    });
    after(() => {
        return locks.close();
    });
    describe('.lock', () => {
        it('creates a lock document', async () => {
            const ids = [uuid()];
            await locks.lock(ids);
        });
        it('throws if lock already exists', (done) => {
            const ids = [uuid()];
            locks.lock(ids).then(() => {
                return locks.lock(ids);
            }).then(() => {
                done('Expected second lock call to throw');
            }, (e) => {
                expect(e.errorResponse.errmsg).to.contain('duplicate key');
                done();
            });
        });
    });
    describe('.unlock', () => {
        it('unlocks a lock document', async () => {
            const ids = [uuid()];
            await locks.lock(ids);
            await locks.unlock(ids);
        });
        it('throws if a lock does not exist', (done) => {
            const ids = [uuid()];
            locks.unlock(ids).then(() => {
                done('Expected second lock call to throw');
            }, (e) => {
                expect(e.message).to.contain('not able to delete');
                done();
            });
        });
    });
    describe('doWhileLocked', () => {
        it('creates a lock and executes the callback', async () => {
            const ids = [uuid()];
            let callbackExecuted = false;
            await locks.doWhileLocked(ids, () => {
                callbackExecuted = true;
            });
            expect(callbackExecuted).to.be.true;
        });
        it('returns the return value of the callback', async () => {
            const ids = [uuid()];
            const result = await locks.doWhileLocked(ids, () => {
                return ids;
            });
            expect(result).to.deep.equal(ids);
        });
        it('lets another caller wait until lock was released', async () => {
            const ids = [uuid()];
            const start = Date.now();
            let duration;
            locks.doWhileLocked(ids, async () => {
                await new Promise((resolve) => setTimeout(resolve, 500));
            });
            await new Promise((resolve) => setTimeout(resolve, 50));
            await locks.doWhileLocked(ids, () => {
                duration = Date.now() - start;
            });
            expect(duration).to.be.greaterThanOrEqual(500);
            expect(duration).to.be.lessThanOrEqual(700);
        });
        it('throws if the callback was interrupted by lock timeout', (done) => {
            const ids = [uuid()];
            locks.doWhileLocked(ids, () => {
                return new Promise((resolve) => setTimeout(resolve, 1_000));
            }, { lockTimeout: 250 })
                .then(() => { done('Should throw.'); }, (e) => {
                    expect(e.message).to.contain('interrupt');
                    // need to wait for other timeouts to finish
                    setTimeout(done, 1_000);
                });
        });
        it('unlocks the document if a lock timeout occured', (done) => {
            const ids = [uuid()];
            locks.doWhileLocked(ids, () => {
                return new Promise((resolve) => setTimeout(resolve, 1_000));
            }, { lockTimeout: 250 })
                .then(() => { done('Should throw.'); }, (e) => {
                    locks.lock(ids);
                    expect(e.message).to.contain('interrupt');
                    // need to wait for other timeouts to finish
                    setTimeout(done, 1000);
                });
        });
        it('unlocks the document if callback throws', (done) => {
            const ids = [uuid()];
            locks.doWhileLocked(ids, () => {
                throw new Error('NOO.');
            }).then(() => { done('Should throw.'); }, () => {
                locks.lock(ids);
                done();
            });
        });
        it('throws if timeout was reached and lock not established', (done) => {
            const ids = [uuid()];
            locks.doWhileLocked(ids, () => {
                return new Promise((resolve) => setTimeout(resolve, 1_000));
            });
            new Promise((resolve) => setTimeout(resolve, 100))
                .then(() => {
                    return locks.doWhileLocked(ids, () => { }, { waitTimeout: 250 });
                })
                .then(() => { done('Should throw.'); }, async (e) => {
                    expect(e.message).to.contain('Unable to establish lock');
                    // need to wait for other timeouts to finish
                    setTimeout(done, 1_000);
                });
        });
    });
});
