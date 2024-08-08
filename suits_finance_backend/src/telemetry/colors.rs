//! # Color Formatting Utilities
//! 
//! This module provides functions to format text with ANSI color codes.
//! Each function takes a string slice and returns a `String` with the appropriate
//! ANSI color codes applied.

/// Formats the given text with red color.
pub fn red(text: &str) -> String {
    format!("\x1b[31m{}\x1b[0m", text)
}

/// Formats the given text with green color.
pub fn green(text: &str) -> String {
    format!("\x1b[32m{}\x1b[0m", text)
}

/// Formats the given text with yellow color.
pub fn yellow(text: &str) -> String {
    format!("\x1b[33m{}\x1b[0m", text)
}

/// Formats the given text with blue color.
pub fn blue(text: &str) -> String {
    format!("\x1b[34m{}\x1b[0m", text)
}

/// Formats the given text with magenta color.
pub fn magenta(text: &str) -> String {
    format!("\x1b[35m{}\x1b[0m", text)
}

/// Formats the given text with cyan color.
pub fn cyan(text: &str) -> String {
    format!("\x1b[36m{}\x1b[0m", text)
}

/// Formats the given text with white color.
pub fn white(text: &str) -> String {
    format!("\x1b[37m{}\x1b[0m", text)
}
