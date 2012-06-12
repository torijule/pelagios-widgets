define('lib/text!template/search.tmpl',[],function () { return '(function() {\n  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};\ntemplates[\'search\'] = template(function (Handlebars,depth0,helpers,partials,data) {\n  helpers = helpers || Handlebars.helpers;\n  var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;\n\n\n  buffer += "<h1 id=\\"";\n  foundHelper = helpers.widgetContext;\n  stack1 = foundHelper || depth0.widgetContext;\n  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.widgetID);\n  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }\n  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "widgetContext.widgetID", { hash: {} }); }\n  buffer += escapeExpression(stack1) + "-title\\" class=\\"pelagios-title\\">Search</h1>    \\r\\n    <form id=\\"";\n  foundHelper = helpers.widgetContext;\n  stack1 = foundHelper || depth0.widgetContext;\n  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.widgetID);\n  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }\n  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "widgetContext.widgetID", { hash: {} }); }\n  buffer += escapeExpression(stack1) + "-search-form\\" class=\\"search-form\\">\\r\\n        <input type=\\"text\\" size=\\"40\\"/>\\r\\n        <input id=\\"";\n  foundHelper = helpers.widgetContext;\n  stack1 = foundHelper || depth0.widgetContext;\n  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.widgetID);\n  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }\n  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "widgetContext.widgetID", { hash: {} }); }\n  buffer += escapeExpression(stack1) + "-search-string\\" type=\\"submit\\" value=\\"Search\\"/>\\r\\n    </form>\\r\\n    <div id=\\"";\n  foundHelper = helpers.widgetContext;\n  stack1 = foundHelper || depth0.widgetContext;\n  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.widgetID);\n  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }\n  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "widgetContext.widgetID", { hash: {} }); }\n  buffer += escapeExpression(stack1) + "-search-results\\">\\r\\n    </div> \\r\\n    <div id=\\"";\n  foundHelper = helpers.widgetContext;\n  stack1 = foundHelper || depth0.widgetContext;\n  stack1 = (stack1 === null || stack1 === undefined || stack1 === false ? stack1 : stack1.widgetID);\n  if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }\n  else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "widgetContext.widgetID", { hash: {} }); }\n  buffer += escapeExpression(stack1) + "-place\\">\\r\\n    </div>\\r\\n \\r\\n  \\r\\n \\r\\n";\n  return buffer;});\n})();';});
