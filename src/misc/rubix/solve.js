var LOGGING = true;

function solve() {
  log(clear);
  // step 1 - the white cross
  log("Step 1. Solve the white cross", bold);
  // locate the white center piece, and move it to the top
  log("orient cube so that white center is on top");
  var whiteCenterFace = getFaceByCenterColor(WHITE);
  switch (whiteCenterFace) {
    case BACK:
      turn(Xi);
      break;
    case LEFT:
      turn(Z);
      break;
    case RIGHT:
      turn(Zi);
      break;
    case DOWN:
      turn(X, 2);
      break;
    case FRONT:
      turn(X);
      break;
  }
  log("solve white edge pieces");
  var wec = [BLUE, RED, GREEN, ORANGE];
  for (var we = 0; we < 4; we++) {
    var loc = getEdgeCubie(WHITE, wec[we]);
    if (!(cubieIncludesFace(UP, loc) && getCubieSideColor(UP, loc) == WHITE && cubieIncludesFace(getFaceByCenterColor(wec[we], loc), loc))) {
      if (cubieIncludesFace(UP, loc) && getCubieSideColor(UP, loc) == WHITE && we == 0) {
        switch (getFaceByCenterColor(wec[we])) {
          case FRONT:
            while (cube[49] != cube[46] || cube[7] != WHITE) turn(U);
            break;
          case LEFT:
            while (cube[22] != cube[23] || cube[3] != WHITE) turn(U);
            break;
          case RIGHT:
            while (cube[31] != cube[30] || cube[5] != WHITE) turn(U);
            break;
          case BACK:
            while (cube[13] != cube[16] || cube[1] != WHITE) turn(U);
            break;
        }
      } else {
        if (cubieIncludesFace(UP, loc)) {
          switch (edgeCubieOtherFace(UP, loc)) {
            case RIGHT:
              turn(R);
              break;
            case LEFT:
              turn(L);
              break;
            case FRONT:
              turn(F);
              break;
            case BACK:
              turn(B);
              break;
          }
        }
        loc = getEdgeCubie(WHITE, wec[we]);
        if (!cubieIncludesFace(DOWN, loc)) {
          if (arrayCompare(loc, CUBIE.edge.FL)) {
            if (getCubieSideColor(FRONT, loc) == WHITE) turns([L, D, Li]);
            else turns([Fi, D, F]);
          } else if (arrayCompare(loc, CUBIE.edge.FR)) {
            if (getCubieSideColor(FRONT, loc) == WHITE) turns([Ri, D, R]);
            else turns([F, D, Fi]);
          } else if (arrayCompare(loc, CUBIE.edge.BL)) {
            if (getCubieSideColor(BACK, loc) == WHITE) turns([Li, D, L]);
            else turns([B, D, Bi]);
          } else if (arrayCompare(loc, CUBIE.edge.BR)) {
            if (getCubieSideColor(BACK, loc) == WHITE) turns([R, D, Ri]);
            else turns([B, D, Bi]);
          }
        } else if (getCubieSideColor(DOWN, loc) != WHITE) {
          if (arrayCompare(loc, CUBIE.edge.DF)) turns([F, L, Fi, D, Li]);
          else if (arrayCompare(loc, CUBIE.edge.DR)) turns([R, F, Ri, D, Fi]);
          else if (arrayCompare(loc, CUBIE.edge.DL)) turns([L, B, Li, D, Bi]);
          else if (arrayCompare(loc, CUBIE.edge.DB)) turns([B, R, Bi, D, Ri]);
        }
        loc = getEdgeCubie(WHITE, wec[we]);
        switch (getFaceByCenterColor(wec[we])) {
          case FRONT:
            while (cube[49] != cube[52] || cube[43] != WHITE) turn(D);
            turn(F, 2);
            break;
          case LEFT:
            while (cube[22] != cube[21] || cube[41] != WHITE) turn(D);
            turn(L, 2);
            break;
          case RIGHT:
            while (cube[31] != cube[32] || cube[39] != WHITE) turn(D);
            turn(R, 2);
            break;
          case BACK:
            while (cube[13] != cube[10] || cube[37] != WHITE) turn(D);
            turn(B, 2);
            break;
        }
      }
    }
  } // end solve white cross
  log("<br />Step 2. Solve the top corners", bold);
  var wcc = [[BLUE, RED], [RED, GREEN], [GREEN, ORANGE], [ORANGE, BLUE]];
  for (var wc = 0; wc < wcc.length; wc++) {
    var loc = getCornerCubie(WHITE, wcc[wc][0], wcc[wc][1]);
    if (!(cubieIncludesFace(UP, loc) && cubieIncludesFace(getFaceByCenterColor(wcc[wc][0]), loc) && cubieIncludesFace(getFaceByCenterColor(wcc[wc][1]), loc) && getCubieSideColor(UP, loc) == WHITE)) {
      if (cubieIncludesFace(UP, loc)) {
        while (!arrayCompare(CUBIE.corner.UFR, loc)) {
          turn(Y);
          loc = getCornerCubie(WHITE, wcc[wc][0], wcc[wc][1]);
        }
        if (!(cubieIncludesFace(getFaceByCenterColor(wcc[wc][0]), loc) && cubieIncludesFace(getFaceByCenterColor(wcc[wc][1]), loc))) {
          turns([Ri, Di, R, D]);
          loc = getCornerCubie(WHITE, wcc[wc][0], wcc[wc][1]);
        }
      }
      if (!(cubieIncludesFace(getFaceByCenterColor(wcc[wc][0]), loc) && cubieIncludesFace(getFaceByCenterColor(wcc[wc][1]), loc))) {
        while (!(cubieIncludesFace(getFaceByCenterColor(wcc[wc][0]), loc) && cubieIncludesFace(getFaceByCenterColor(wcc[wc][1]), loc))) {
          turn(D);
          loc = getCornerCubie(WHITE, wcc[wc][0], wcc[wc][1]);
        }
        while (!arrayCompare(CUBIE.corner.DFR, loc)) {
          turn(Y);
          loc = getCornerCubie(WHITE, wcc[wc][0], wcc[wc][1]);
        }
        turns([Ri, Di, R, D]);
        loc = getCornerCubie(WHITE, wcc[wc][0], wcc[wc][1]);
      }
        
      // correct corner, re-orient to be correct
      if (getCubieSideColor(FRONT, loc) == WHITE) {
        turns([Di, Ri, D, R], 2);
      } else if (getCubieSideColor(RIGHT, loc) == WHITE) {
        turns([Ri, Di, R, D], 2);
      }
      // end rotate corner
    }
  } // end solve top corners
  log("<br />Step 3. Solve the side edge pieces", bold);
  turn(X, 2);
  var sec = [[BLUE, RED], [RED, GREEN], [GREEN, ORANGE], [ORANGE, BLUE]];
  for (var se = 0; se < sec.length; se++) {
    var loc = getEdgeCubie(sec[se][0], sec[se][1]);
    if (!cubieIncludesFace(UP, loc)) {
      while (!arrayCompare(loc, CUBIE.edge.FR)) {
        turn(Y);
        loc = getEdgeCubie(sec[se][0], sec[se][1]);
      }
      turns([U, R, Ui, Ri, Ui, Fi, U, F]);
      loc = getEdgeCubie(sec[se][0], sec[se][1]);
    }
    if (cubieIncludesFace(UP, loc)) {
      switch (getFaceByCenterColor(getCubieSideColor(edgeCubieOtherFace(UP, loc), loc))) {
        case FRONT:
          while (cube[49] != cube[46] || cube[7] != getCubieSideColor(UP, loc)) {
            turn(U);
            loc = getEdgeCubie(sec[se][0], sec[se][1]);
          }
          break;
        case LEFT:
          while (cube[22] != cube[23] || cube[3] != getCubieSideColor(UP, loc)) {
            turn(U);
            loc = getEdgeCubie(sec[se][0], sec[se][1]);
          }
          break;
        case RIGHT:
          while (cube[31] != cube[30] || cube[5] != getCubieSideColor(UP, loc)) {
            turn(U);
            loc = getEdgeCubie(sec[se][0], sec[se][1]);
          }
          break;
        case BACK:
          while (cube[13] != cube[16] || cube[1] != getCubieSideColor(UP, loc)) {
            turn(U);
            loc = getEdgeCubie(sec[se][0], sec[se][1]);
          }
          break;
      }
      loc = getEdgeCubie(sec[se][0], sec[se][1]);
      while (!arrayCompare(loc, CUBIE.edge.UF)) {
        turn(Y);
        loc = getEdgeCubie(sec[se][0], sec[se][1]);
      }
      if (getFaceByCenterColor(getCubieSideColor(UP, loc)) == RIGHT) {
        turns([U, R, Ui, Ri, Ui, Fi, U, F]);
      } else {
        turns([Ui, Li, U, L, U, F, Ui, Fi]);
      }
      loc = getEdgeCubie(sec[se][0], sec[se][1]);
    }
  } // end solve second layer
  log("<br />Step 4. Solve the yellow cross", bold);
  var pattern = 0; // 0 = dot, 1 = line, 2 = L, 3 = cross 
  if (cube[3] == YELLOW && cube[5] == YELLOW) {
    pattern = 1;
  } else if (cube[1] == YELLOW && cube[7] == YELLOW) {
    pattern = 1;
    turn(U, 2);
  } else if (cube[1] == YELLOW && cube[3] == YELLOW) {
    pattern = 2;
  } else if (cube[3] == YELLOW && cube[7] == YELLOW) {
    pattern = 2;
    turn(U);
  } else if (cube[7] == YELLOW && cube[5] == YELLOW) {
    pattern = 2;
    turn(U, 2);
  } else if (cube[5] == YELLOW && cube[1] == YELLOW) {
    pattern = 2;
    turn(Ui);
  } else if (cube[1] == YELLOW && cube[3] == YELLOW && cube[5] == YELLOW && cube[7] == YELLOW) {
    pattern = 3;
  }
  if (pattern == 1) {
    turns([F, R, U, Ri, Ui, Fi]);
  } else if (pattern == 2) {
    turns([F, U, R, Ui, Ri, Fi]);
  } else if (pattern == 0) {
    turns([R, U, U, Ri, Ri, F, R, Fi, U, U, Ri, F, R, Fi]);
  }
  // end solve top cross
  log("<br />Step 5. Solve the top edges", bold);
  while (
    !(cube[46] == cube[49] && cube[16] == cube[13]) &&
    !(cube[22] == cube[23] && cube[30] == cube[31]) && 
    !(cube[46] == cube[49] && cube[30] == cube[31]) &&
    !(cube[30] == cube[31] && cube[16] == cube[13]) && 
    !(cube[13] == cube[16] && cube[22] == cube[23]) && 
    !(cube[22] == cube[23] && cube[46] == cube[49])
  ) {
    turn(U);
  }
  if (!(cube[46] == cube[49] && cube[16] == cube[13] && cube[22] == cube[23] && cube[30] == cube[31])) {
    if (cube[46] == cube[49] && cube[16] == cube[13]) {
      turns([R, U, Ri, U, R, U, U, Ri, Yi, R, U, Ri, U, R, U, U, Ri, U]);
    } else if (cube[22] == cube[23] && cube[30] == cube[31]) {
      turns([Y, R, U, Ri, U, R, U, U, Ri, Yi, R, U, Ri, U, R, U, U, Ri, U]);
    } else if (cube[46] == cube[49] && cube[30] == cube[31]) {
      turns([Yi, R, U, Ri, U, R, U, U, Ri, U]);
    } else if (cube[30] == cube[31] && cube[16] == cube[13]) {
      turns([R, U, Ri, U, R, U, U, Ri, U]);
    } else if (cube[13] == cube[16] && cube[22] == cube[23]) {
      turns([Y, R, U, Ri, U, R, U, U, Ri, U]);
    } else if (cube[22] == cube[23] && cube[46] == cube[49]) {
      turns([Y, Y, R, U, Ri, U, R, U, U, Ri, U]);
    }
    // end solve top edges
    log("<br />Step 6. Solve the top corners", bold);
    var solved = false;
    while (!solved) {
      // are all in correct place?
      if (
       arrayCompare(CUBIE.corner.UFR, getCornerCubie(cube[4], cube[49], cube[31])) &&
       arrayCompare(CUBIE.corner.UFL, getCornerCubie(cube[4], cube[49], cube[22])) &&
       arrayCompare(CUBIE.corner.UBR, getCornerCubie(cube[4], cube[13], cube[31])) &&
       arrayCompare(CUBIE.corner.UBL, getCornerCubie(cube[4], cube[13], cube[22]))
      ) {
        solved = true;
        break;
      } else {
        // are any in correct place?
        if (
          arrayCompare(CUBIE.corner.UFR, getCornerCubie(cube[4], cube[49], cube[31])) ||
          arrayCompare(CUBIE.corner.UFL, getCornerCubie(cube[4], cube[49], cube[22])) ||
          arrayCompare(CUBIE.corner.UBR, getCornerCubie(cube[4], cube[13], cube[31])) ||
          arrayCompare(CUBIE.corner.UBL, getCornerCubie(cube[4], cube[13], cube[22]))
        ) {
          while (!arrayCompare(CUBIE.corner.UFR, getCornerCubie(cube[4], cube[49], cube[31]))) {
            turn(Y);
          }
          // all in right place?
          while (!(
            arrayCompare(CUBIE.corner.UFR, getCornerCubie(cube[4], cube[49], cube[31])) &&
            arrayCompare(CUBIE.corner.UFL, getCornerCubie(cube[4], cube[49], cube[22])) &&
            arrayCompare(CUBIE.corner.UBR, getCornerCubie(cube[4], cube[13], cube[31])) &&
            arrayCompare(CUBIE.corner.UBL, getCornerCubie(cube[4], cube[13], cube[22]))
          )) {
            turns([U, R, Ui, Li, U, Ri, Ui, L]);
          }
          solved = true;
        } else {
            turns([U, R, Ui, Li, U, Ri, Ui, L]);
        }
      }
    } 
    // rotate corners
    for (var c = 0; c < 4; c++) {
      if (getCubieSideColor(UP, CUBIE.corner.UFR) != YELLOW) {
        if (getCubieSideColor(FRONT, CUBIE.corner.UFR) == YELLOW) turns([Di, Ri, D, R], 2);
        else turns([Ri, Di, R, D], 2);
      }
      turn(U);
    }
    // done
    log("<br />SOLVED!!!!!", bold);
  }
}