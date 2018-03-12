function grid(){
  var container = document.createElement("div");
  container.id = "main";
  container.className = "container";
  document.body.appendChild(container);
  var main = document.getElementById('main');
  for (var i=0; i<16; i++) {
      var row = document.createElement("div");
      row.className = "row";
      row.id = "row" + i;
      main.appendChild(row);
      var roww = document.getElementById('row'+i);
      for (var j=0; j<16; j++) {
          var box = document.createElement("div");
          box.className = "box";
          roww.appendChild(box);
      }
  }
}
window.onload = grid();