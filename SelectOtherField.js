Ext.define('Ux.field.SelectOtherField', {
  extend: 'Ext.field.Select',
  xtype: 'selectotherfield',
  config: {
    otherText: 'Other...',
    promptTitle: 'New Option',
    promptMessage: 'Enter new option:'
  },
  initialize: function() {
    var opts;
    this.callParent();
    opts = this.getOptions();
    opts.push({
      text: this.getOtherText(),
      value: this.getOtherText()
    });
    return this.updateOptions(opts);
  },
  onChange: function(cmp, newValue) {
    var _this = this;
    this.callParent();
    if (newValue === this.getOtherText()) {
      return Ext.Msg.prompt(this.getPromptTitle(), this.getPromptMessage(), function(choice, text) {
        if (choice === 'ok' && text.trim() !== '') {
          return _this.insertAndChooseOption(text);
        }
      });
    }
  },
  insertAndChooseOption: function(text) {
    var opts;
    opts = this.getOptions();
    opts[opts.length - 1] = {
      text: text,
      value: text
    };
    opts.push({
      text: this.getOtherText(),
      value: this.getOtherText()
    });
    this.updateOptions(opts);
    return this.setValue(text);
  }
});
