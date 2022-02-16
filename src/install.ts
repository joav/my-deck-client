export class Install {
  private _prompt: any;
  constructor(private _trigger: HTMLElement) {
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      this._prompt = e;
      this.toggleInstallButton('show');
    });

    this._trigger.addEventListener('click', () => this.triggerInstall());
    
    window.addEventListener('appinstalled', () => {
      this._prompt = null;
      this.toggleInstallButton('hide');
    });
  }

  toggleInstallButton(action = 'hide') {
    if (action === 'hide') {
      this._trigger.style.display = 'none';
    } else {
      this._trigger.style.display = 'block';
    }
  }

  async triggerInstall() {
    this._prompt.prompt();
    const { outcome } = await this._prompt.userChoice;

    this._prompt = null;

    if (outcome === 'accepted') {
      this.toggleInstallButton('hide');
    }
  }
}
