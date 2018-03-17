export const SHOW_ERROR = 'SHOW_ERROR';
export const HIDE_ERROR = 'HIDE_ERROR';

function _showError() {
    return {
        type: SHOW_ERROR
    }
};

function _hideError() {
    return {
        type: HIDE_ERROR
    }
};

export const showError = () => dispatch => {
    dispatch(_showError());
};

export const hideError = () => dispatch => {
    dispatch(_hideError());
};