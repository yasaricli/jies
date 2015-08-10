
Template.push.onRendered(function() {
  CodeMirror.fromTextArea(this.find("[name='body']"), {
    lineNumbers: true,
    theme: 'ambiance',
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
      theme: 'ambiance',
      readOnly: true,
      mode: "javascript" // set any of supported language modes here
    });
  }
});

Template.code.onDestroyed(function() {
  $('.CodeMirror').remove();
});

Template.push.onDestroyed(function() {
  $('.CodeMirror').remove();
});
