// Domain Errors == Business Rules Errors
import {BaseError} from '@/worker/common/errors';

// Application Errors == Workflow Issues
abstract class ApplicationError extends BaseError {
}

// Raised when both scraping providers raised
export class InitialFetchFailedError extends ApplicationError {
}

// Raised when creation of a tracking job failed
export class TrackingJobCreationFailed extends ApplicationError {
}