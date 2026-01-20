class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    }
    
    _getInputValues() {
        this._popupSelector {(inputValue) => {
            value = {};
            inputValue.forEach(input => {
                value.append(input);
                return value;
            });
        };
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this.popupSelector.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.popupSelector.clear();
            this.close();
        });
    }}