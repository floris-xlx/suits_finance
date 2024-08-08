//! ## Audit log
//! 


use serde_json::{from_value, json, Value};
use serde::{Serialize, Deserialize};
use std::error::Error;
use supabase_rs::SupabaseClient;
use tracing::{error, info, warn};

// crate imports
use crate::initialize_supabase_client;

const TABLE_NAME_AUDIT_LOG_API: &str = "audit_log_api";
const TABLE_NAME_AUDIT_LOG: &str = "audit_log";



#[derive(Deserialize, Serialize, Debug, Clone)]
/// ## AuditLog struct
///     
/// This struct is used to create a new audit log entry in the database.
/// 
/// ### Fields
/// - `user_id` - The user's username.
/// 
pub struct AuditLog {
    pub status: AuditLogStatus,
    pub user_id: String,
    pub message: String,
    pub route: String,
    pub request: String,
}




#[derive(Deserialize, Serialize, Debug, Clone)]
pub enum AuditLogStatus {
    Success,
    Error,
    Warning,
    Info,
}

// to string
impl ToString for AuditLogStatus {
    fn to_string(&self) -> String {
        match self {
            AuditLogStatus::Success => "success".to_string(),
            AuditLogStatus::Error => "error".to_string(),
            AuditLogStatus::Warning => "warning".to_string(),
            AuditLogStatus::Info => "info".to_string(),
        }
    }
}


