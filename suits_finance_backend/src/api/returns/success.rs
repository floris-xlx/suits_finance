//! This module provides various HTTP response helpers for success and error messages.

use actix_web::{HttpResponse, Responder};
use serde_json::{json, Value};

/// Respond with a success message
///
/// # Arguments
///
/// * `message` - A string slice that holds the success message
///
/// # Returns
///
/// * `impl Responder` - A JSON response with status "success" and the provided message
///
/// # Examples
///
/// ```
/// let response = ok_with_message("Operation successful");
/// ```
pub fn ok_with_message(message: &str) -> impl Responder {
    HttpResponse::Ok().json(json!({
        "status": "success",
        "message": message
    }))
}


/// Respond with a success message and data
///
/// # Arguments
///
/// * `message` - A string slice that holds the success message
/// * `data` - A serde_json::Value that holds the additional data
///
/// # Returns
///
/// * `impl Responder` - A JSON response with status "success", the provided message, and data
///
/// # Examples
///
/// ```
/// let data = json!({"key": "value"});
/// let response = ok_with_message_data("Operation successful", data);
/// ```
pub fn ok_with_message_data(message: &str, data: Value) -> impl Responder {
    HttpResponse::Ok().json(json!({
        "status": "success",
        "message": message,
        "data": data
    }))
}

