/*

HAHAHAAHHAAHAHHAHAHHAHAHAHAHAHAHAHAHAHHAHAHAHAHAHHAHAHAHAHAHHAHAHAH

我覽得打住解了XD


*/
var all = [],
    IGrids = board.getGridsByCrd("A1:K7"),
    HGrids = board.getGridsByCrd("A1:G11"),
    XLGrids = board.getGridsByCrd("A1:G7"),
    XRGrids = board.getGridsByCrd("E1:K7");
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
for (var i = 0; i < 11; i++)
    for (var j = 1; j < 8; j++) {
        var temp = [
            board.getGridByCrd(String.fromCharCode(65 + i) + j)
        ];
        for (var k = 1; k < 5; k++)
            temp.push(
                board.getGridByCrd(String.fromCharCode(65 + i) + (j + k))
            );
        all.push(temp);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
for (var i = 0; i < 7; i++)
    for (var j = 1; j < 12; j++) {
        var temp = [
            board.getGridByCrd(String.fromCharCode(65 + i) + j)
        ];
        for (var k = 1; k < 5; k++)
            temp.push(
                board.getGridByCrd(String.fromCharCode(65 + i + k) + j)
            );
        all.push(temp);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
for (var i = 0; i < 7; i++)
    for (var j = 1; j < 8; j++) {
        var temp = [
            board.getGridByCrd(String.fromCharCode(65 + i) + j)
        ];
        for (var k = 1; k < 5; k++)
            temp.push(
                board.getGridByCrd(String.fromCharCode(65 + i + k) + (j + k))
            );
        all.push(temp);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
for (var i = 4; i < 11; i++)
    for (var j = 1; j < 8; j++) {
        var temp = [
            board.getGridByCrd(String.fromCharCode(65 + i) + j)
        ];
        for (var k = 1; k < 5; k++)
            temp.push(
                board.getGridByCrd(String.fromCharCode(65 + i - k) + (j + k))
            );
        all.push(temp);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function turnToComputer(piece) {
    var ATK = [],
        DEF = [],
        xDEF = [[], []],
        SPC = [],
        most = function (crds, once) {
            function count(crd) {
                var count = 0;
                for (var i = 0; i < crds.length; i++)
                    if (crds[i] == crd) count++;
                return count;
            }
            var result = [],
                search = {},
                total = 0,
                max = 1;
            for (var i = 0; i < crds.length; i++)
                if (search[crds[i]] == undefined) search[crds[i]] = count(crds[i]);
            for (var i in search) {
                if (search[i] > max) {
                    max = search[i];
                    result = [i];
                } else if (search[i] == max) result.push(i);
                total++;
            }
            if (total == result.length && max > 1 && !once) return [];
            return result;
        },
        RAN = function (crds) { return crds[Math.floor((Math.random() * crds.length))] };
    for (var i = 0; i < 4; i++) { ATK.push([]); DEF.push([]); }
    for (var i = 0; i < 2; i++) xDEF.push([]);
    for (var a = 0; a < all.length; a++) {
        var count = 0,
            CRD = {
                "": [],
                "B": [],
                "W": []
            };
        for (var b = 0; b < all[a].length; b++) {
            var P = all[a][b].getStatus("piece"),
                crd = all[a][b].crd;
            if (P == "" && !SPC.includes(crd))
                SPC.push(crd);
            CRD[P].push(crd);
        }
        if (CRD.B.length > 0 && CRD.W.length > 0) {
            if (CRD.B.length == 3 && piece == "W" || CRD.W.length == 3 && piece == "B") xDEF[1] = xDEF[1].concat(CRD[""]);
            if (CRD.B.length == 4 && piece == "W" || CRD.W.length == 4 && piece == "B") {
                var x4DEFR = all[a][1].getRelCrdByGrid(all[a][0]),
                    x4DEF = all[a][0].getGridByRelCrd(x4DEFR);
                if (x4DEF) xDEF[0].push(x4DEF.crd);
            }
        } else {
            var lineOfPiece = CRD.B.length > 0 ? "B" : "W",
                count = CRD[""].length;
            if (count == 5) continue;
            for (var i = 0; i < 4; i++) {
                if (count != i + 1) continue;
                if (lineOfPiece == piece) ATK[i] = ATK[i].concat(CRD[""]);
                else DEF[i] = DEF[i].concat(CRD[""]);
            }
        }
    }
    for (var i = 0; i < 4; i++) {
        ATK[i] = most(ATK[i], i == 0);
        DEF[i] = most(DEF[i], i == 0);
        if (i == 1) DEF[i] = DEF[i].filter(function (crd) { return !xDEF[0].includes(crd) });
        if (i == 2) DEF[i] = DEF[i].filter(function (crd) { return !xDEF[1].includes(crd) });
    }
    var PO = [
        ATK[0], DEF[0],
        ATK[1], DEF[1],
        ATK[2], DEF[2],
        ATK[3], DEF[3],
        SPC
    ], SEL;
    for (var i = 0; i < PO.length; i++) {
        if (PO[i].length == 0) continue;
        if (PO[i].length == 1) {
            SEL = PO[i][0];
            break;
        } else {
            var most = [];
            for (var j = i; j < PO.length; j++) {
                for (var k = 0; k < PO[i].length; k++) {
                    if (PO[j].includes[PO[i][k]])
                        most.push(PO[i][k]);
                }
                if (most.length > 0) break;
            }
            if (most.length == 0) SEL = RAN(PO[i]);
            else SEL = RAN(most);
            break;
        }
    }
    board.clickGrid(SEL);
    return SEL;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
