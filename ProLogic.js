/**-Variable configProp creates a two dimensional array of objects (propositional constants).
-Function contingentCount counts the number of propositional constants with "contingent" status.
-Function truthValueGenerate returns a matrix similar to values of truth table.
-[update 2020 May 2] Function truthValueGenerate takes two arguments (configProp and index); will do the funtion of contingentCount. For each operators check if the input matrix contains arrays with same number of elements. If that is true, check if the number of elements in a row is atleast the number of rows. If that is true perform a transpose of matrix and then calculate the result. If not, check if log base 2 of the matrix[0].length is an integer (to check if this is a "generated matrix"). If that is the case run operator (without transpose). If not, transpose and then run operator. 
-p OP q: operOP(p.concat(q))
**/
var propConstantArray = [];

var configProp = [
    [
        //This will be filled with propositions.
        {
            symbol: "p",
            status: "contingent",
            sentence: "This is a proposition."
            state: [];
        }   
    ]
];


//Count the number of contingent propositional constants
/*
var contingentCount = function(configProp, index) {
    //Contingency Counter
    for (var i = 0; i < configProp[index].length; i++) {
        if (configProp[index][i].status === "contingent") {
            contingents++;
        }
    }
};*/

//Adds the contents of an array.
function myFunc(total, num) {
  return total + num;
}

//Transpose a non-operable matrix
var transposeMatrix = function(matrix) {
    var result = new Array(matrix[0].length);
    
    for (var i = 0; i < result.length; i++) {
        result[i] = new Array(matrix.length);
        
        for (var j = 0; j < result[i].length; j++) {
            result[i][j] = matrix[j][i];
        }
    }
    
    return result;
};

//Concatenates two truth values array
var concTruth = function(array1, array2){
    array1.concat(array2);
};

//A function that will generate a square wave for some period.
var squareWave = function(period, t) {
    var y = 2*(2*Math.floor(t/period) - Math.floor(2*t/period)) + 1;
    return y;
};var truthValueGenerate = function(configProp, index) {
    var truthTable = []; //An n-dimensional Matrix: truthTable[i,j]
    var contingents = 0;
    var numRows = 0;
    
    //Contingency Counter
    for (var i = 0; i < configProp[index].length; i++) {
        if (configProp[index][i].status === "contingent") {
            contingents++;
        }
    }
    
    numRows = Math.pow(2,configProp[index].length); //Count the number of rows to generate.
    
    //Generates a _numRows_ by _contingents_ matrix
    for (var i = 0; i < numRows; i++) {
        truthTable[i] = new Array(contingents);
    }
    
    //Generate the values for elements of the matrix truthTable using square wave function squareWave.
    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < contingents; j++) {
            if (j === 0){
                if (squareWave(numRows, i) === 1) {
                    truthTable[i][j] = 1;
                }
                else if (squareWave(numRows, i) === -1) {
                    truthTable[i][j] = 0;
                }
            }else {
                if (squareWave(numRows/pow(2,j), i) === 1) {
                    truthTable[i][j] = 1;
                }
                else if (squareWave(numRows/pow(2,j), i) === -1) {
                    truthTable[i][j] = 0;
                }
            }
        }
    }
    
    //create states keys
    for (var i = 0; i < configProp[index].length; i++) {
        var transposedTruthTable = transposeMatrix(truthTable);
        configProp[index][i].states.push(transposedTruthTable[i]);
    }
    
    return truthTable;
};

var operAND = function(matrix, indices) {
    var truthValues = [[]];
    var numRows = Math.pow(2,matrix[0].length); //Count the number of rows to generate.
    
    var temp = matrix[0].length;
    function isOnto(test) {
        return test.length === temp;
    }
    
    //Check if number of rows is less than the number of columns.
    //If the number of element in a row is greater the number of elements in a column perform a transpose on matrix.
    if (matrix.every(isOnto)) {
        if (matrix[0].length >= matrix.length) {
            matrix = transposeMatrix(matrix);
            //Checks each row if it has 1.
            for (var i = 0; i < matrix.length; i++) {
                if (matrix[i].includes(0) === true) {
                    truthValues[0][i] = 0;
                } else {
                    truthValues[0][i] = 1;
                }
            }
        } else if (Number.isInteger(Math.log2(matrix[0].length))){
        //True if all are true <=> sum in a row is equal to the number of rows.
        //Maybe inefficient; try checking for 0 in a row instead.
            for (var i = 0; i < numRows; i++) {
                if (matrix[i].includes(0) === true) {
                    truthValues[0][i] = 0;
                } else {
                    truthValues[0][i] = 1;
                }
            }
        } else {
            matrix = transposeMatrix(matrix);
            //Checks each row if it has 1.
            for (var i = 0; i < matrix.length; i++) {
                if (matrix[i].includes(0) === true) {
                    truthValues[0][i] = 0;
                } else {
                    truthValues[0][i] = 1;
                }
            }
        }
    } else {
        return ["unequal array sizes!"];
    }
    return truthValues;
};

var operOR = function(matrix, indices) {
    var truthValues = [[]];
    var numRows = Math.pow(2,matrix[0].length); //Count the number of rows to generate.
    var temp = matrix[0].length;
    function isOnto(test) {
        return test.length === temp;
    }
    //Check if number of rows is less than the number of columns.
    //If the number of element in a row is greater the number of elements in a column perform a transpose on matrix.
    if (matrix.every(isOnto) === true) {
        if (matrix[0].length >= matrix.length ) {
            matrix = transposeMatrix(matrix);
            //Checks each row if it has 1.
            for (var i = 0; i < matrix.length; i++) {
                if  (matrix[i].includes(1) === true) {
                    truthValues[0][i] = 1;
                } else {
                    truthValues[0][i] = 0;
                }
            }
        } else {
            //Checks each row if it has 1.
            if (Number.isInteger(Math.log2(matrix[0].length))) {
                for (var i = 0; i < matrix.length; i++) {
                    if  (matrix[i].includes(1) === true) {
                        truthValues[0][i] = 1;
                    } else {
                        truthValues[0][i] = 0;
                    }
                }
            } else {
                matrix = transposeMatrix(matrix);
                //Checks each row if it has 1.
                for (var i = 0; i < matrix.length; i++) {
                    if  (matrix[i].includes(1) === true) {
                        truthValues[0][i] = 1;
                    } else {
                        truthValues[0][i] = 0;
                    }
                }
            }
        }
    } else {
        return ["unequal array sizes!"];
    }
    return truthValues;
};

var operXOR = function(matrix, index) {
    var truthValues = [[]];
    var numRows = Math.pow(2,matrix[0].length); //Count the number of rows to generate.
    
    var temp = matrix[0].length;
    function isOnto(test) {
        return test.length === temp;
    }
    
    //Check if number of rows is less than the number of columns.
    //If the number of element in a row is greater the number of elements in a column perform a transpose on matrix.
    if (matrix.every(isOnto)) {
        if (matrix[0].length >= matrix.length) {
            matrix = transposeMatrix(matrix);
            //Checks each row if it has 1.
            for (var i = 0; i < matrix.length; i++) {
                if  (matrix[i].reduce(myFunc) % 2 === 1) {
                    truthValues[0][i] = 1;
                } else {
                    truthValues[0][i] = 0;
                }
            }
        } else if (Number.isInteger(Math.log2(matrix[0].length))){
            //Checks each row if it has 1.
            for (var i = 0; i < numRows; i++) {
                if  (matrix[i].reduce(myFunc) % 2 === 1) {
                    truthValues[0][i] = 1;
                } else {
                    truthValues[0][i] = 0;
                }
            }
        } else {
            matrix = transposeMatrix(matrix);
            //Checks each row if it has 1.
            for (var i = 0; i < matrix.length; i++) {
                if (matrix[i].includes(0) === true) {
                    truthValues[0][i] = 0;
                } else {
                    truthValues[0][i] = 1;
                }
            }
        }
    } else {
        return ["unequal array sizes!"];
    }
    return truthValues;
};

var operNOT = function(matrix) {
    var numRows = Math.pow(2,matrix[0].length); //Count the number of rows to generate.
    var truthValues = [[]];
    if (matrix[0].length >= matrix.length) {
        matrix = transposeMatrix(matrix);
        for (var i = 0; i < matrix.length; i++) {
            truthValues[0][i] = ((matrix[i][0] + 1) % 2); //matrix[i][0] because for some reason, matrix prints a two dimensional array with i rows and a column; 0 in [i][0] to access that column vector.
           
        }
    } else {
        for (var i = 0; i < matrix.length; i++) {
            truthValues[i] = ((matrix[i] + 1) % 2);
        }
    }
    return truthValues;
};

//Perform Transpose on Matrices
/******Objects******/
/**
var PropConstants = function(configProp) {
    this.propName = configProp.propName;
    this.status = configProp.status;
    this.propContent = configProp.propContent;
};

PropConstants.prototype.andOperate = function() {
    
};

PropConstants.prototype.orOperate = function() {

};

for (var i = 0; i < configProp.length; i++) {
    propConstantArray[i] = new PropConstants(configProp[1][i]);
}

var slds = new PropConstants({propName: "s", status: "contingent", propContent: "blabla."});
configProp[1].push({propName: "s", status: "contingent", propContent: "blabla."});

//contingentCount(configProp, 1);
//truthValueGenerate(configProp, 1);

var dsd = truthValueGenerate(configProp,0);
var ppp = truthValueGenerate(configProp,1);
var ANDtruths = operAND(dsd);
var ORtruths = operOR(dsd);
var XORtruths = operXOR(dsd);
var NOTtruths = operNOT(dsd, 1);
*/
/*
//Composition of funtions
println(XORtruths);
println(ORtruths);
println(operXOR(ORtruths.concat(XORtruths)));//Working!!!
println(operOR(operXOR(ORtruths.concat(XORtruths)).concat(ANDtruths)));
println(operAND([[0,0,1],[0,0,1],[0,1,1],[0,0,0],[0,0,1]]));
println("NOT of q " + ORtruths);
println(slds.propName);
*/
