Template.insertCode.onRendered(function() {
  this.$('[name="readme"]').autosize();

  CodeMirror.fromTextArea(this.find("[name='body']"), {
    lineNumbers: true,
    theme: 'monokai',
    matchBrackets: true,
    tabSize: 2,
    autofocus: true,
    mode: "javascript" // set any of supported language modes here
  });
});

Template.updateCode.onRendered(function() {
  this.$('[name="readme"]').autosize();

  CodeMirror.fromTextArea(this.find("[name='body']"), {
    lineNumbers: true,
    theme: 'monokai',
    matchBrackets: true,
    tabSize: 2,
    autofocus: true,
    mode: "javascript" // set any of supported language modes here
  });
});

Template.code.onRendered(function() {
  if (this.data.code()) {
    CodeMirror.fromTextArea(this.find("[name='body']"), {
      lineNumbers: true,
      theme: 'monokai',
      readOnly: true,
      mode: "javascript" // set any of supported language modes here
    });
  }
});

// code mirror on destroyed template remove .
onDestroyedTemplates(['insertCode', 'updateCode', 'code'], function() {
  $('.CodeMirror').remove();
});
