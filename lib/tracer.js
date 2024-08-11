import { createTracer } from "@discue/open-telemetry-tracing";

const tracer = createTracer({
    filepath: '@discue/mongodb-resource-client'
})

export const withActiveSpan = tracer.withActiveSpan