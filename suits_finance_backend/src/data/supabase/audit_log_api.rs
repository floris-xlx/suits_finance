//! ## Create User Module
//!
//! This module provides functionality to create a new user in the database.
//! It includes the `DexterUser` struct and its associated methods for creating
//! a new user and returning the user_id.

use serde_json::{from_value, json, Value};
use std::error::Error;
use supabase_rs::SupabaseClient;
use tracing::{error, info, warn};

// crate imports
use crate::colors;
use crate::initialize_supabase_client;
use crate::telemetry::audit_log::{AuditLog, AuditLogStatus};
use crate::utils::unix_time::current_unix_time;

const TABLE_NAME: &str = "audit_log_api";


/// ## AuditLog struct
impl AuditLog {
    /// Create a new audit log entry
    pub async fn new(
        request: &str,
        route: &str,
        status: AuditLogStatus,
        user_id: &str,
        message: &str,
    ) -> Result<Value, Box<dyn Error>> {
        let client: SupabaseClient = initialize_supabase_client().await;
        let current_unix_time = current_unix_time();

        let status_string = status.to_string();

        let audit_log_data: Value = json!({
            "user_id": user_id,
            "status": status_string,
            "message": message,
            "route": route,
            "request": request,
            "unix_time": current_unix_time,
        });

        let response: String = client.insert(TABLE_NAME, audit_log_data.clone()).await?;

        if response.to_string().contains("Error 409") {
            error!(
                "{}",
                colors::red(&format!("Error creating audit log entry: {:#?}", response))
            );
            return Err("Error creating audit log entry".into());
        }

        info!(
            "{}",
            colors::green(&format!("Audit log entry created: {:#?}", response))
        );

        let return_object: Value = json!(
            {
                "user_id": user_id,
                "status": status_string,
                "message": message,
                "route": route,
                "request": request,
                "response": response,
                "unix_time": current_unix_time,
            }
        );

        Ok(return_object)
    }
}
