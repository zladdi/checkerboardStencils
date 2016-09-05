// title      : Checkerboard Stencils
// author     : Zlatko Franjcic
// license    : MIT License

function rectangluarPattern(nX, nY, sizeX, sizeY, sizeZ) {
    pattern = [];
    for(var i=0; i<nY; i++) {
        for (var j=0; j<nX; j++) {
        pattern.push(cube({size:[sizeX,sizeY,sizeZ]})
            .translate([sizeX*2*j, sizeY*2*i]));
      }
   }
   return pattern;
}

function cylinderPattern(nX, nY, r, h, distX, distY) {
   pattern = [];
   for (var i=0; i<nY; i++) {
       for (var j=0; j<nX; j++) {
           pattern.push(cylinder({r: r, h: h})
                .translate([2*distX*j, 2*distY*i]));
       }
   }
   return pattern;
}

function unequalLengthStencils(board) {
    var pattern1 = [];
    var pattern2 = [];
    var pattern3 = [];
    var pattern_x_size = 5;
    var pattern_y_size = 6;
    var pattern_z_size = 3;
    var cylinder_r = 0.5;
    var cylinder_h = 3;
    var offset_x = 6.5;
    var offset_y = 3;
    
    pattern1 = rectangluarPattern(4,3,
                            pattern_x_size,
                            pattern_y_size,
                            pattern_z_size);
    pattern1 = union(pattern1).translate([offset_x,
                                         offset_y+pattern_y_size,0]);
    
    pattern2 = rectangluarPattern(3,3,
                            pattern_x_size,
                            pattern_y_size,
                            pattern_z_size);

    pattern2 = union(pattern2).translate([offset_x+pattern_x_size,
                                        offset_y,0]);
    
    pattern3 = cylinderPattern(5, 4,
                            cylinder_r,
                            cylinder_h,
                            pattern_x_size,
                            pattern_y_size);
    pattern3 = union(pattern3).translate([offset_x-0.5*pattern_x_size,offset_y+(1.5*pattern_y_size),0]);
   
    
    return [difference(board, pattern1),
            difference(board, pattern2, pattern3)];
}

function main() {
   var pattern1 = [];
   var pattern2 = [];
   var pattern3 = [];
   var plate_size_x=39;
   var plate_size_y=33;
   var plate_thickness = 0.25;
   var pattern_x_size = 3;
   var pattern_y_size = 3;
   var pattern_z_size = 3;
   var cylinder_r = 0.5;
   var cylinder_h = 3;
   var offset_x = 6;
   var offset_y = 3;
  
 
   // first template
   pattern1 = rectangluarPattern(5,4,
                            pattern_x_size,
                            pattern_y_size,
                            pattern_z_size);
   pattern1 = union(pattern1).translate([offset_x,offset_y,0]);
   
   // second template
   pattern2 = rectangluarPattern(4,3,
                            pattern_x_size,
                            pattern_y_size,
                            pattern_z_size);
   pattern2 = union(pattern2).translate([1.5*offset_x,2*offset_y,0]);
   
   // cylinders
   pattern3 = cylinderPattern(6, 5,
                            cylinder_r,
                            cylinder_h,
                            pattern_x_size,
                            pattern_y_size);
   pattern3 = union(pattern3).translate([3*offset_x/4,3*offset_y/2,0]);
   
   plate = cube({size: 
                [plate_size_x,plate_size_y,plate_thickness]});
   
   stencil1 = difference(plate,
                pattern1);
   
   stencil2 = difference(plate,
                pattern2, pattern3).translate([0, plate_size_y + 5, 0]);
 
   var plate2_size_x = plate_size_x+9;
   var plate2_size_y = plate_size_y+21;
   plate2 = cube({size: 
                [plate2_size_x,plate2_size_y,plate_thickness]});
   [stencil3, stencil4]=unequalLengthStencils(plate2);
 
 
   stencil3 = stencil3.translate([0, -(plate_size_y + 23), 0]);
   
   stencil4 = stencil4.translate([0, -2*(plate_size_y + 23), 0]);

   return union(stencil1, stencil2, stencil3, stencil4);
}

