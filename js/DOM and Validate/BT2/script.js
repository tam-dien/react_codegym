function check_account(s) {
    regexp = /^[_a-z0-9]{6,}$/;
    if (regexp.test(s)) {
        return true;
    } 
    return false;
}