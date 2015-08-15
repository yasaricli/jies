Template.insertCode.onRendered(function() {
  this.$('[name="readme"]').autosize();
  this.$('[name="name"]').focus();

  CodeMirror.fromTextArea(this.find("[name='body']"), {
    viewportMargin: Infinity,
    lineNumbers: true,
    theme: 'neo',
    tabSize: 2,
    mode: "javascript" // set any of supported language modes here
  });
});

Template.updateCode.onRendered(function() {
  this.$('[name="readme"]').autosize();
  this.$('[name="desc"]').focus();

  CodeMirror.fromTextArea(this.find("[name='body']"), {
    viewportMargin: Infinity,
    lineNumbers: true,
    theme: 'neo',
    tabSize: 2,
    mode: "javascript" // set any of supported language modes here
  });
});

Template.code.onRendered(function() {
  if (this.data.code()) {
    CodeMirror.fromTextArea(this.find("[name='body']"), {
      lineNumbers: true,
      theme: 'neo',
      readOnly: true,
      mode: "javascript" // set any of supported language modes here
    });
  }
});

Template.search.onRendered(function() {
  this.$('input').focus();
});

// code mirror on destroyed template remove .
onDestroyedTemplates(['insertCode', 'updateCode', 'code'], function() {
  $('.CodeMirror').remove();
});
