Ext.define 'Ux.field.SelectOtherField'
  extend: 'Ext.field.Select'
  xtype: 'selectotherfield'

  config:
    otherText: 'Other...'
    promptTitle: 'New Option'
    promptMessage: 'Enter new option:'

  initialize: ->
    @callParent()
    opts = @getOptions()
    opts.push
      text: @getOtherText()
      value: @getOtherText()
    @updateOptions opts

  onChange: (cmp, newValue) ->
    @callParent()
    if newValue is @getOtherText()
      Ext.Msg.prompt @getPromptTitle(), @getPromptMessage(), (choice, text) =>
        if choice is 'ok' and text.trim() isnt ''
          @insertAndChooseOption text

  insertAndChooseOption: (text) ->
    opts = @getOptions()
    opts[opts.length - 1] =
      text: text
      value: text
    opts.push
      text: @getOtherText()
      value: @getOtherText()
    @updateOptions opts
    @setValue text
