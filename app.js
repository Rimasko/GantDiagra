var data = [];
var matrixSum = [];
var ResultData = [];
var ResultSumData = [];
function initGant(detCount, machCount) {
    data = [];
    matrixSum =[];
    $('#firstTable').empty();
    $('#firstSumTable').empty();
    $('#resultSumTable').empty();
    $('#resultTable').empty();
    for (var i = 0; i < detCount; i++) {
        var line = [];

        for (var j = 0; j < machCount; j++) {
            var rnd = Math.floor(Math.random() * 20);


            line.push(rnd);
        }
        data.push(line);
    }

    var table = getInputTable(data, detCount, machCount);
    $('#firstTable').append(table);
    calculateGant(data, detCount, machCount)
}

function updateGant(detCount, machCount, array2)
{
    data = array2;
    matrixSum =[];
    $('#firstTable').empty();
    $('#firstSumTable').empty();
    $('#resultSumTable').empty();
    $('#resultTable').empty();

    var table = getInputTable(data, detCount, machCount);
    $('#firstTable').append(table);
    calculateGant(data, detCount, machCount)
}
function getTable(table, DCount, MCount) {

    var content = '<table class="table table-dark" ><tbody>'
    for (var i = 0; i < DCount; i++) {
        content += "<tr>"
        for (var j = 0; j < MCount; j++) {

            content += `<td>${table[i][j]}</td>`;
        }
        content += "<tr>"

        // ещё какие-то выражения
    }
    console.log(table[0][0]);
    content += "</tbody></table>";
    return content;
}
function getInputTable(table, DCount, MCount) {

    var content = '<table class="table table-dark" ><tbody>'
    for (var i = 0; i < DCount; i++) {
        content += "<tr>"
        for (var j = 0; j < MCount; j++) {

            content += '<td><input style="width: 40px" type="number" id ="'+i+''+j+'"  value = "'+table[i][j]+'"></td>';
        }
        content += "<tr>"

        // ещё какие-то выражения
    }
    console.log(table[0][0]);
    content += "</tbody></table>";
    return content;
}

function calculateGant(table, DC, MC) {
    DCount = parseInt(DC);
    MCount = parseInt(MC);
    var matrixFirst = [];
    var matrixEnd = [];
    var matrixMinusStartEnd = [];
    var sum = 0;
    for (var i = 0; i < DCount; i++) {
        var start = 0;
        var end = 0;
        var minus = 0;
        matrixSum.push([]);
        for (var j = 0; j < MCount; j++) {
            if (j != MCount - 1) {
                end += table[i][j];
            }
            if (j != 0) {
                start += table[i][j];
            }
            matrixSum[i].push(table[i][j]);

            if (i == 0) {
                sum += matrixSum[i][j];
                matrixSum[i][j] = sum;

            }
            else if (i > 0 && j == 0) {
                sum = matrixSum[i - 1][j] + matrixSum[i][j];
                matrixSum[i][j] = sum;

            }
            else {
                if (matrixSum[i - 1][j] > matrixSum[i][j - 1])
                    sum = matrixSum[i - 1][j] + matrixSum[i][j];

                if (matrixSum[i - 1][j] <= matrixSum[i][j - 1])
                    sum = matrixSum[i][j - 1] + matrixSum[i][j];
                matrixSum[i][j] = sum;

            }

        }
        minus = start - end;
        matrixFirst.push(start);
        matrixEnd.push(end);
        matrixMinusStartEnd.push(minus);
    }

    //sum First
    var Htmltable = getTable(matrixSum, DCount, MCount);
    $('#firstSumTable').append(Htmltable);

    var First = [];
    var End = [];
    var Minus = []

    for (var i = 0; i < DCount; i++) {
        First.push([]);
        End.push([]);
        Minus.push([]);

        for (var j = 0; j < MCount + 1; j++) {
            if(j==0)
            {
            First[i].push(i + 1);
            End[i].push(i + 1);
            Minus[i].push(i + 1);
            }
            if (j != 0) {
                First[i].push(table[i][j - 1]);
                End[i].push(table[i][j - 1]);
                Minus[i].push(table[i][j - 1]);
               
            }
        }
    }
    console.log("matrixFirst");
    console.log(matrixFirst);
    console.log("matrixEnd");
    console.log(matrixEnd);
    console.log("matrixMinusStartEnd");
    console.log(matrixMinusStartEnd);
    First = Sort(matrixFirst, First, true);
    End = Sort(matrixEnd, End, false);
    Minus = Sort(matrixMinusStartEnd, Minus, true);

    var FirstClone = CloneArray(First,DCount,MCount+1);
    var EndClone = CloneArray(End,DCount,MCount+1);
    var MinusClone = CloneArray(Minus,DCount,MCount+1);

    First = GetSummArray2(First,DCount,MCount+1);
    End = GetSummArray2(End,DCount,MCount+1);
    Minus = GetSummArray2(Minus,DCount,MCount+1);

    console.log("First");
    console.log(First);
    console.log("End");
    console.log(End);
    console.log("Minus");
    console.log(Minus);

    console.log("FirstClone");
    console.log(FirstClone);
    console.log("EndClone");
    console.log(EndClone);
    console.log("MinusClone");
    console.log(MinusClone);

    var result = [];
    if (First[DCount - 1][MCount] < End[DCount - 1][MCount]) {
        if (First[DCount - 1][MCount] < Minus[DCount - 1][MCount]) {
            ResultSumData = First;
            ResultData = FirstClone;
        }
        else {
            ResultSumData = Minus;
            ResultData = MinusClone;
        }
    }
    else {
        if (End[DCount - 1][MCount] < Minus[DCount - 1][MCount])
        {
            ResultSumData = End;
            ResultData = EndClone;
        }
        else{
            ResultSumData = Minus;
            ResultData = MinusClone;
        }
    }

   var  Htmltable1 = getTable(ResultSumData, DCount, MCount+1);
    $('#resultSumTable').append(Htmltable1);
    var  Htmltable2 = getTable(ResultData, DCount, MCount+1);
    $('#resultTable').append(Htmltable2);
    DrawGant() ;
}
function CloneArray(array2,d,m) {
    var a = [];
    for (var i = 0; i < d; i++) {

        a.push([]);
        for (var j = 0; j < m; j++) {
            a[i].push(array2[i][j]);
        }
    }
    console.log('a');
    console.log(a);
    return a;
}
function GetSummArray2(array2, DCount, MCount) {
    var sum = 0;
    for (var i = 0; i < DCount; i++) {


        for (var j = 0; j < MCount; j++) {
            if (j !== 0) {
                if (i == 0) {
                    sum += array2[i][j];
                    array2[i][j] = sum;

                }
                else if (i > 0 && j == 1) {
                    sum = array2[i - 1][j] + array2[i][j];
                    array2[i][j] = sum;

                }
                else {
                    if (array2[i - 1][j] > array2[i][j - 1])
                        sum = array2[i - 1][j] + array2[i][j];

                    if (array2[i - 1][j] <= array2[i][j - 1])
                        sum = array2[i][j - 1] + array2[i][j];
                    array2[i][j] = sum;

                }
            }

        }

    }
    return array2;
}
function Sort(array, array2, ubiv) {
    var temp = 0;
    var t = [];
    console.log('before');
    console.log( array);
    for (var write = 0; write < array.length; write++) {

        for (var sort = 0; sort < array.length - 1; sort++) {
            if (ubiv ==true) {
                if (parseInt(array[sort],10) < parseInt(array[sort + 1],10) ){
                    temp = array[sort + 1];
                    array[sort + 1] = array[sort];
                    array[sort] = temp;

                    t = array2[sort + 1];
                    array2[sort + 1] = array2[sort];
                    array2[sort] = t;
                }
            }
            else {
                if (parseInt(array[sort],10) > parseInt(array[sort + 1],10)) {
                    temp = array[sort + 1];
                    array[sort + 1] = array[sort];
                    array[sort] = temp;

                    t = array2[sort + 1];
                    array2[sort + 1] = array2[sort];
                    array2[sort] = t;
                }
            }
            console.log('for');
        }
    }
    console.log('after');
    console.log(array);
    return array2;
}
function DrawGant() {
    $('#GanttChartDIV').empty();
    g = new JSGantt.GanttChart('g', document.getElementById('GanttChartDIV'), 'day');

    g.setShowRes(0); // Show/Hide Responsible (0/1)
    g.setShowDur(0); // Show/Hide Duration (0/1)
    g.setShowComp(0); // Show/Hide % Complete(0/1)
    g.setCaptionType('Resource');  // Set to Show Caption

    if (g) {

        var tasjArray1 = [];
        for(var i = 0; i < ResultSumData.length; i++)
        {tasjArray1.push([]);
        for(var j = 1 ; j< ResultSumData[i].length; j++)
        {
            var taskSE = {
                start : new Date(),
                end: new Date()
            }
            tasjArray1[i].push(taskSE);
        }
        }
        for(var i = 1; i< ResultSumData[0].length; i++ )
        {
          // Example  g.AddTaskItem(new JSGantt.TaskItem(1, 'NAME', 'TIME START', ' TIME END', 'COLOR', '', 0, 'Brian', comlet, group(1 - parent), partent id, 1));
          g.AddTaskItem(new JSGantt.TaskItem(i, 'Станок '+(i), '', '', getColor(i), '', 0, 'Станок '+(i), 0, 1, 0, 1));
            for(var j = 0 ; j< ResultSumData.length; j++)
            {
                var TaskStart = new Date();
                if(j==0 && i ==1)
                {
                    TaskStart = new Date();
                }
                else if( i == 1)
                {
                    var k = 1;

                    while (j - k > 1)
                    {
                        if (ResultSumData[j - k][i] > 0) break;
                        k++;
                    }
                    TaskStart.setDate(TaskStart.getDate()+ResultSumData[j-k][i]);

                }
                else if (j > 0)
                {
                    var k = 1;
                    var v = 1;
                    while (j - k >1)
                    {
                        if (ResultSumData[j - k][i] > 0) break;
                        k++;
                    }
                    while (i - v > 2)
                    {
                        if (ResultSumData[j][i - v] > 0) break;
                        v++;
                    }
                    if (ResultSumData[j][i - v] > ResultSumData[j - k][i])
                    TaskStart.setDate(TaskStart.getDate()+ResultSumData[j][i - v]);
                    else
                   TaskStart.setDate(TaskStart.getDate()+ResultSumData[j - k][i]);
                }
                else {
                    TaskStart.setDate(TaskStart.getDate()+ResultSumData[j][i - 1]);
                }
                var TaskEnd = new Date();
                TaskEnd.setDate(TaskEnd.getDate()+ResultSumData[j][i]);
                tasjArray1[j][i-1].start = TaskStart;
                tasjArray1[j][i-1].end = TaskEnd;

                console.log('Деталь'+(ResultSumData[j][0]) +' '+TaskStart+' '+TaskEnd +' '+ getFormatDate(TaskStart)+ ' ' +getFormatDate(TaskEnd) );
                g.AddTaskItem(new JSGantt.TaskItem(((i)*10+(ResultSumData[j][0])), 'Деталь '+(ResultSumData[j][0]), getFormatDate(TaskStart), getFormatDate(TaskEnd), getColor(ResultSumData[j][0]), '', 0, 'Деталь '+(ResultSumData[j][0]), 100, 0, (i), 1));

            }
        }



        // g.AddTaskItem(new JSGantt.TaskItem(1, 'NAME', 'TIME START', ' TIME END', 'COLOR', '', 0, 'Brian', 0, 1, 0, 1));
        // g.AddTaskItem(new JSGantt.TaskItem(11, 'Chart Object', '2/20/2008', '2/20/2008', 'ff00ff', 'http://www.yahoo.com', 1, 'Shlomy', 100, 0, 1, 1));
        // g.AddTaskItem(new JSGantt.TaskItem(12, 'Task Objects', '', '', '00ff00', '', 0, 'Shlomy', 40, 1, 1, 1));
        // g.AddTaskItem(new JSGantt.TaskItem(121, 'Constructor Proc', '2/21/2008', '3/9/2008', '00ffff', 'http://www.yahoo.com', 0, 'Brian T.', 60, 0, 12, 1));
        // g.AddTaskItem(new JSGantt.TaskItem(122, 'Task Variables', '3/6/2008', '3/11/2008', 'ff0000', 'http://google.com', 0, '', 60, 0, 12, 1, 121));
        // g.AddTaskItem(new JSGantt.TaskItem(123, 'Task Functions', '3/9/2008', '3/29/2008', 'ff0000', 'http://google.com', 0, 'Anyone', 60, 0, 12, 1, 0, 'This is another caption'));
        // g.AddTaskItem(new JSGantt.TaskItem(2, 'Create HTML Shell', '3/24/2008', '3/25/2008', 'ffff00', 'http://google.com', 0, 'Brian', 20, 0, 0, 1, 122));
        // g.AddTaskItem(new JSGantt.TaskItem(3, 'Code Javascript', '', '', 'ff0000', 'http://google.com', 0, 'Brian', 0, 1, 0, 1));
        // g.AddTaskItem(new JSGantt.TaskItem(31, 'Define Variables', '2/25/2008', '3/17/2008', 'ff00ff', 'http://google.com', 0, 'Brian', 30, 0, 3, 1, 0, 'Caption 1'));
        // g.AddTaskItem(new JSGantt.TaskItem(32, 'Calculate Chart Size', '3/15/2008', '3/24/2008', '00ff00', 'http://google.com', 0, 'Shlomy', 40, 0, 3, 1));
        // g.AddTaskItem(new JSGantt.TaskItem(33, 'Draw Taks Items', '', '', '00ff00', 'http://google.com', 0, 'Someone', 40, 1, 3, 1));
        // g.AddTaskItem(new JSGantt.TaskItem(332, 'Task Label Table', '3/6/2008', '3/11/2008', '0000ff', 'http://google.com', 0, 'Brian', 60, 0, 33, 1));
        // g.AddTaskItem(new JSGantt.TaskItem(333, 'Task Scrolling Grid', '3/9/2008', '3/20/2008', '0000ff', 'http://google.com', 0, 'Brian', 60, 0, 33, 1));
        // g.AddTaskItem(new JSGantt.TaskItem(34, 'Draw Task Bars', '', '', '990000', 'http://google.com', 0, 'Anybody', 60, 1, 3, 1));
        // g.AddTaskItem(new JSGantt.TaskItem(341, 'Loop each Task', '3/26/2008', '4/11/2008', 'ff0000', 'http://google.com', 0, 'Brian', 60, 0, 34, 1, "332,333"));
        // g.AddTaskItem(new JSGantt.TaskItem(342, 'Calculate Start/Stop', '4/12/2008', '5/18/2008', 'ff6666', 'http://google.com', 0, 'Brian', 60, 0, 34, 1));
        // g.AddTaskItem(new JSGantt.TaskItem(343, 'Draw Task Div', '5/13/2008', '5/17/2008', 'ff0000', 'http://google.com', 0, 'Brian', 60, 0, 34, 1));
        // g.AddTaskItem(new JSGantt.TaskItem(344, 'Draw Completion Div', '5/17/2008', '6/04/2008', 'ff0000', 'http://google.com', 0, 'Brian', 60, 0, 34, 1));
        // g.AddTaskItem(new JSGantt.TaskItem(35, 'Make Updates', '10/17/2008', '12/04/2008', 'f600f6', 'http://google.com', 0, 'Brian', 30, 0, 3, 1));



        g.Draw();
        g.DrawDependencies();


    }
    else {
        alert("not defined");
    }
}
function getFormatDate(date)
{
    var fD = ''+(date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
    return fD;
}
function getColor(id)
{
    switch(id)
    {
        case 0:
        {
            return  'e6b0aa' ;
        }
        case 1:
        {
            return  'f1948a' ;
        }
        case 2:
        {
            return  'CD5C5C' ;
        }
        case 3:
        {
            return  '7CFC00' ;
        }
        case 4:
        {
            return  '2980b9' ;
        }
        case 5:
        {
            return  'BA55D3' ;
        }
        case 6:
        {
            return  'f0b27a ' ;
        }
        case 6:
        {
            return  '566573 ' ;
        }

         default : return  '566573' ;
    }
}
