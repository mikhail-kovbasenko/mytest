class InitialApp {
  constructor() {
    this._header = document.getElementById("header");
    this._main = document.getElementById("main");
    this._app = globalThis.app;

    this._init();
  }
  _init() {
    const { id, username, departament, access } = this._app.storage.user;

    this._getCommandPanelByDepartament(departament, access);
    this._setUsernameAbbr(username);
    this._getDefaultDataFromServer(id, departament, access);

    this._header.addEventListener("click", (event) =>
      this._app.handler.btnClick(event)
    );
    this._header.addEventListener("change", (event) =>
      this._app.handler.selectChange(event)
    );
    this._header.addEventListener("input", (event) =>
      this._app.handler.inputChange(event)
    );
  }
  _getCommandPanelByDepartament(departament, access) {
    const commandPanel = this._header.querySelector(
      "#command-panel-" + departament
    );

    switch (departament) {
      case 1:
        {
          const exportBtn = this._header.querySelector(
            "#header-default-elements-group .export-btn"
          );
          exportBtn.disabled = true;
        }
        break;
    }
    commandPanel.classList.add("show");
  }
  _setUsernameAbbr(username) {}
  _getDefaultDataFromServer(id, departament, access) {
      this._app.request.get(id).then(response => {
          this._app.config.set(response);

          const index = this._getIndexForDefaultDataByDepartament(departament);

          return this._app.request.get(index);
      }).then(data => {
          this._app.html.createTable(data);
      })
  }
}
