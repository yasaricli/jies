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
  var $el = $(this.firstNode);

  // focus search input
  this.$('input').focus();

  this.instance = EasySearch.getComponentInstance({
    index : 'codes'
  });

  this.instance.on('searchResults', function(result) {
    if (_.isEmpty(result)) {
      return $el.removeClass('result');
    }
    return $el.addClass('result');
  });
});

// code mirror on destroyed template remove .
onDestroyedTemplates(['insertCode', 'updateCode', 'code'], function() {
  $('.CodeMirror').remove();
});
