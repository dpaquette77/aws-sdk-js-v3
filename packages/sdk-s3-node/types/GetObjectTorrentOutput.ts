import {ResponseMetadata as __ResponseMetadata__} from '@aws/types';
import {Readable} from 'stream';

/**
 * GetObjectTorrentOutput shape
 */
export interface GetObjectTorrentOutput<StreamType = Readable> {
    /**
     * _Body shape
     */
    Body?: StreamType;

    /**
     * If present, indicates that the requester was successfully charged for the request.
     */
    RequestCharged?: 'requester'|string;

    /**
     * Metadata about the response received, including the HTTP status code, HTTP
     * headers, and any request identifiers recognized by the SDK.
     */
    $metadata: __ResponseMetadata__;
}