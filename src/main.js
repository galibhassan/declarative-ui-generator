var getRepeatedTag = function(tag, childrenArr){
  outputString = '';
  for(var i=0; i<childrenArr.length; i++){
    outputString += `<${tag}> ${childrenArr[i]} </${tag}>`
  };
  return outputString;
}

var uiGenerator = function (uiObj) {
  var borderRadius = '5px 5px 5px 0px';
  var themeColor = 'rgba(15, 99, 188,1)';
  var boxShadow = '1px 1px 10px 1px rgba(0,0,0,0.1)';

  var outputHTLBlocksArr = [];
  for (var i = 0; i < uiObj.length; i++) {
    var outputHTML = ''
    for (var j = 0; j < uiObj[i].length; j++) {
      var currentElement = uiObj[i][j];
      switch (currentElement.type) {
        case 'lineFeed':
          outputHTML += `<br/>`;
          break;
        case 'heading':
          outputHTML += `<div style="
                            background-color: ${currentElement.color || themeColor};
                            border-radius: ${borderRadius};
                            color: white;
                            padding: 5px;
                            width: 100%;
                            margin-top: -20px;
                            margin-left: -20px;
                            box-shadow: ${boxShadow}
                          ">${currentElement.label}</div>`;
          break;
        case 'description':
          outputHTML += `<div style="display:inline-block; margin-left:0px; margin-top:10px" > ${currentElement.text} </div>`;
          break;
        case 'dropdownSelect':
          outputHTML += `<div style="box-shadow:${boxShadow};display:inline-block; margin-left:10px; margin-top:10px; margin-right:10px; border:1px solid rgba(0,0,0,0.1); padding:5px; border-radius:5px" >
              <div style="margin-bottom:5px">${currentElement.label}</div>
              <select style="border:1px solid rgba(0,0,0,.1);border-radius:3px;">${getRepeatedTag('option', currentElement.options)}</select>  
            </div>`;
          break;
        case 'slider':
          outputHTML += `<div style="box-shadow:${boxShadow}; display:inline-block;  margin-left:10px; margin-top:10px; border:0px solid rgba(0,0,0,0.1); padding:5px; border-radius:5px"> ${currentElement.label} <input id=" ${currentElement.id || currentElement.type + '_' + currentElement.label}" type="range" min="${currentElement.min}" max="${currentElement.max}"> </div>`
          break;
        case 'textInput':
          outputHTML += `<div style="box-shadow:${boxShadow};display:inline-block; margin-left:10px; margin-top:10px;"> <input style="padding:5px; border:1px solid rgba(0,0,0,0.1); border-radius:5px" id=" ${currentElement.id || currentElement.type + '_' + currentElement.label}" type="text" placeholder="${currentElement.label}"/> </div>`
          break;
        case 'checkbox':
          outputHTML += `<div style="box-shadow:${boxShadow};display:inline-block; margin-left:10px; margin-top:10px;border:1px solid rgba(0,0,0,0.1); padding:5px; border-radius:5px"> <input id=" ${currentElement.id || currentElement.type + '_' + currentElement.label}" type="checkbox"> ${currentElement.label} </input> </div>`
          break;
      }
    }
    // outputHTML += `<br/><br/><br/>`
    var currentBlock = `
      <div style="
        display: inline-block;
        vertical-align:top;
        box-shadow: ${boxShadow};
        padding: 20px;
        margin:5px;
        border-radius:${borderRadius};
        font-family:sans-serif;
        font-size: 0.85rem;
        color: rgba(100,100,100,1)
      "> ${outputHTML} </div>`
    outputHTLBlocksArr.push(currentBlock);
  }

  return outputHTLBlocksArr.join("");
}

module.exports = {
  uiGenerator:uiGenerator
}