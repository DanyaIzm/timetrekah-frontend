/**
 * Timetrekah API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The TitleRequest model module.
 * @module model/TitleRequest
 * @version 0.1.0
 */
class TitleRequest {
    /**
     * Constructs a new <code>TitleRequest</code>.
     * @alias module:model/TitleRequest
     * @param name {String} 
     * @param startDate {Date} 
     * @param activity {Number} 
     */
    constructor(name, startDate, activity) { 
        
        TitleRequest.initialize(this, name, startDate, activity);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, name, startDate, activity) { 
        obj['name'] = name;
        obj['start_date'] = startDate;
        obj['activity'] = activity;
    }

    /**
     * Constructs a <code>TitleRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TitleRequest} obj Optional instance to populate.
     * @return {module:model/TitleRequest} The populated <code>TitleRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new TitleRequest();

            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('image')) {
                obj['image'] = ApiClient.convertToType(data['image'], File);
            }
            if (data.hasOwnProperty('start_date')) {
                obj['start_date'] = ApiClient.convertToType(data['start_date'], 'Date');
            }
            if (data.hasOwnProperty('end_date')) {
                obj['end_date'] = ApiClient.convertToType(data['end_date'], 'Date');
            }
            if (data.hasOwnProperty('activity')) {
                obj['activity'] = ApiClient.convertToType(data['activity'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>TitleRequest</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>TitleRequest</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of TitleRequest.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }

        return true;
    }


}

TitleRequest.RequiredProperties = ["name", "start_date", "activity"];

/**
 * @member {String} name
 */
TitleRequest.prototype['name'] = undefined;

/**
 * @member {String} description
 */
TitleRequest.prototype['description'] = undefined;

/**
 * @member {File} image
 */
TitleRequest.prototype['image'] = undefined;

/**
 * @member {Date} start_date
 */
TitleRequest.prototype['start_date'] = undefined;

/**
 * @member {Date} end_date
 */
TitleRequest.prototype['end_date'] = undefined;

/**
 * @member {Number} activity
 */
TitleRequest.prototype['activity'] = undefined;






export default TitleRequest;

