//! Utility functions for working with Unix time.

use chrono::Utc;

/// Returns the current Unix time in seconds.
///
/// # Examples
///
/// ```
/// let unix_time = current_unix_time().await;
/// println!("Current Unix time: {}", unix_time);
/// ```
pub fn current_unix_time() -> i64 {
    Utc::now().timestamp()
}


