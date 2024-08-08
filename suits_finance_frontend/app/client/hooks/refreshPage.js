function refreshPage() {
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
}

export { refreshPage };