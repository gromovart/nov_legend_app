import L from 'leaflet';
import * as React from 'react';

const icon = {
  mapIconUrl: `<svg
    version='1.0'
    xmlns='http://www.w3.org/2000/svg'
    width='12'
    height='24'
    viewBox='0 0 640.000000 1280.000000'
    preserveAspectRatio='xMidYMid meet'

  >
    <g
      transform='translate(0.000000,1280.000000) scale(0.100000,-0.100000)'
      fill='#000000'
      stroke='none'
    >
      <path
        d='M5506 12785 c-11 -8 -26 -15 -34 -15 -21 0 -81 -30 -147 -73 -198
-131 -490 -438 -900 -945 -55 -68 -111 -138 -125 -157 -14 -18 -79 -105 -145
-193 -235 -313 -447 -615 -658 -937 -51 -77 -94 -144 -96 -150 -2 -5 -33 -55
-69 -110 -36 -55 -80 -124 -99 -152 -51 -79 -160 -258 -279 -458 -58 -99 -115
-192 -125 -207 -11 -15 -19 -29 -19 -32 0 -2 -21 -40 -46 -83 -59 -98 -274
-484 -274 -490 0 -2 -17 -35 -39 -71 -81 -139 -481 -934 -481 -955 0 -3 -23
-54 -50 -113 -28 -60 -55 -118 -59 -129 -5 -11 -16 -36 -24 -55 -14 -32 -39
-89 -71 -165 -58 -136 -86 -206 -203 -510 -8 -22 -19 -49 -24 -60 -22 -53
-185 -539 -204 -610 -19 -70 -52 -190 -71 -255 -36 -127 -110 -427 -124 -505
-4 -22 -17 -87 -29 -145 -11 -58 -25 -127 -31 -155 -11 -54 -32 -192 -50 -320
-6 -44 -15 -108 -21 -141 -5 -34 -9 -80 -9 -102 0 -39 -28 -273 -33 -279 -2
-1 -59 53 -127 120 -127 125 -314 267 -350 267 -31 0 -25 -20 33 -106 221
-332 357 -626 421 -915 10 -41 16 -93 14 -114 -3 -36 -6 -40 -38 -47 -67 -15
-199 2 -405 53 -105 26 -116 23 -68 -23 75 -69 242 -169 365 -217 36 -14 36
-31 -1 -31 -72 0 -237 -71 -387 -167 -110 -70 -144 -97 -144 -113 0 -16 59 -8
130 17 53 20 126 40 220 62 126 30 329 36 369 11 11 -6 9 -20 -8 -66 -12 -33
-40 -115 -63 -184 -22 -69 -44 -134 -48 -145 -5 -11 -16 -45 -26 -75 -9 -30
-20 -64 -25 -75 -4 -11 -14 -42 -23 -70 -9 -27 -42 -131 -74 -230 -33 -99 -76
-234 -96 -300 -21 -66 -48 -151 -61 -190 -12 -38 -35 -110 -50 -160 -15 -49
-40 -130 -55 -180 -39 -125 -87 -279 -107 -345 -8 -30 -19 -66 -24 -80 -4 -14
-19 -65 -34 -115 -15 -49 -31 -101 -35 -115 -5 -14 -16 -52 -25 -85 -9 -33
-21 -71 -25 -85 -4 -14 -16 -52 -25 -85 -10 -33 -21 -69 -25 -80 -8 -23 -39
-126 -51 -170 -4 -16 -15 -54 -23 -84 -23 -77 -21 -91 11 -91 19 0 40 14 74
50 55 59 56 60 155 395 15 50 36 117 47 150 10 33 26 85 33 115 8 30 33 114
55 185 22 72 45 144 50 160 17 55 91 289 109 345 9 30 41 129 70 220 29 91 67
210 85 265 18 55 45 138 59 185 15 47 33 101 41 120 8 19 26 76 41 125 15 50
30 97 35 105 4 8 19 53 34 100 14 47 30 94 34 105 14 34 33 89 38 110 2 11 8
29 13 40 5 11 11 29 13 40 3 11 34 103 70 205 35 102 78 228 96 280 18 52 36
104 41 115 4 11 15 43 25 70 9 28 20 59 25 70 5 11 10 29 13 40 3 11 24 72 47
135 23 63 61 169 85 235 23 66 62 172 85 235 23 63 48 135 57 160 8 25 21 59
28 75 8 17 20 50 29 75 8 25 27 77 42 115 14 39 35 95 46 125 11 30 25 69 32
85 7 17 19 46 26 65 13 36 40 109 83 220 14 36 35 92 47 125 13 33 28 74 35
90 7 17 19 48 28 70 26 69 89 229 102 260 7 17 27 68 45 115 17 47 38 99 45
115 7 17 25 62 40 100 15 39 34 86 42 105 19 46 27 66 49 120 10 25 33 78 51
118 18 41 33 79 33 86 0 6 4 16 9 21 4 6 22 44 39 85 58 144 130 315 150 360
11 25 54 126 97 225 42 99 82 194 90 210 21 48 65 146 87 195 11 25 30 68 43
95 12 28 30 68 40 90 22 51 77 169 119 260 81 171 116 246 116 250 0 2 63 134
141 292 78 158 166 340 196 403 107 226 246 493 424 817 15 26 38 70 53 97 14
27 30 54 35 60 4 6 28 47 51 91 42 77 239 413 285 485 12 19 55 89 96 155 40
66 77 125 81 130 5 6 32 46 60 90 57 91 156 236 229 340 27 39 57 81 66 95 61
90 381 510 389 510 8 0 -18 -43 -50 -84 -123 -157 -431 -623 -621 -941 -42
-71 -88 -148 -102 -170 -38 -62 -163 -276 -163 -280 0 -2 -22 -42 -50 -90 -27
-48 -50 -89 -50 -91 0 -4 -111 -204 -130 -234 -5 -8 -27 -49 -49 -90 -21 -41
-56 -106 -76 -145 -106 -201 -436 -861 -467 -935 -20 -47 -94 -209 -166 -361
-150 -318 -182 -388 -182 -394 0 -3 -17 -42 -39 -88 -21 -45 -45 -98 -54 -117
-8 -19 -30 -66 -47 -105 -18 -38 -40 -90 -50 -115 -10 -25 -33 -79 -52 -120
-19 -41 -40 -91 -47 -110 -8 -19 -22 -53 -31 -75 -17 -37 -49 -111 -70 -160
-4 -11 -20 -46 -34 -78 -14 -32 -26 -60 -26 -63 0 -3 -11 -29 -24 -57 -13 -29
-31 -71 -39 -94 -9 -23 -25 -61 -36 -85 -10 -24 -42 -99 -69 -168 -28 -69 -67
-165 -88 -215 -20 -49 -59 -146 -87 -215 -27 -69 -53 -134 -58 -145 -5 -11
-56 -144 -114 -295 -58 -151 -110 -284 -114 -295 -5 -11 -26 -65 -46 -120 -21
-55 -48 -127 -60 -160 -13 -33 -30 -80 -39 -105 -8 -25 -27 -76 -42 -115 -14
-38 -41 -113 -60 -165 -19 -52 -38 -104 -43 -115 -5 -11 -22 -56 -36 -100 -15
-44 -33 -93 -40 -110 -7 -16 -25 -64 -38 -105 -14 -41 -44 -127 -67 -190 -23
-63 -50 -140 -60 -170 -10 -30 -44 -127 -75 -215 -31 -88 -69 -198 -85 -245
-16 -47 -34 -98 -40 -115 -33 -92 -130 -396 -130 -409 0 -8 21 -30 48 -49 71
-53 144 -133 204 -222 64 -95 89 -108 81 -43 -12 101 -87 255 -168 346 -31 35
-42 53 -33 56 7 3 99 7 203 11 184 5 215 9 395 41 230 41 461 134 625 252 175
126 407 422 331 422 -8 0 -17 -4 -20 -9 -15 -24 -128 -89 -191 -111 -80 -26
-315 -42 -315 -21 0 6 8 11 18 11 10 0 22 4 27 9 6 5 51 30 100 55 50 26 99
52 110 59 182 111 310 210 409 318 62 66 181 222 210 274 9 17 25 44 35 60 68
114 87 165 60 165 -6 0 -42 -27 -81 -60 -151 -131 -386 -263 -538 -302 -226
-59 -372 -76 -523 -60 -63 7 -132 12 -153 12 -36 1 -38 2 -20 15 10 8 44 19
75 26 70 14 270 79 336 109 116 52 286 141 352 184 39 25 74 46 77 46 4 0 37
22 75 50 38 27 74 50 80 50 6 0 11 4 11 8 0 4 23 25 51 46 104 77 286 246 365
337 83 96 234 298 316 424 86 132 165 274 269 485 44 91 85 174 89 185 5 11
21 47 35 80 15 33 34 78 42 100 8 22 24 60 35 85 11 25 27 62 34 83 7 20 20
52 28 70 32 71 152 427 161 480 8 42 1 45 -48 23 -106 -47 -367 -123 -367
-107 0 8 41 32 114 70 152 78 368 268 489 431 120 161 194 300 171 322 -3 4
-56 -20 -117 -52 -126 -66 -209 -99 -314 -124 -98 -24 -110 -16 -33 22 241
118 430 280 570 487 56 84 165 304 230 465 12 30 26 64 30 75 30 74 74 209
102 317 17 67 3 78 -52 43 -54 -34 -149 -77 -225 -103 -126 -41 -243 -72 -276
-72 -30 0 -20 8 81 61 176 93 311 199 418 328 152 182 398 593 594 991 42 85
85 175 96 200 48 110 124 295 143 352 12 35 25 68 29 73 4 6 10 21 13 35 3 14
17 68 32 120 48 172 62 244 90 460 34 267 7 586 -68 795 -57 156 -119 247
-266 387 -102 97 -214 168 -265 168 -12 0 -31 7 -42 15 -12 9 -42 14 -79 14
-37 0 -67 -5 -79 -14z'
      />
    </g>
  </svg>`,
};

// const arrowIcon = {
//   mapIconUrl: `
// <svg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='35' height='35'  x='0px' y='0px'
// viewBox='0 0 511.001 511.001' style='enable-background:new 0 0 511.001 511.001;' xml:space='preserve'>
//   <path  d='M508.803,2.197c-2.122-2.122-5.304-2.775-8.089-1.66l-96,38.4C401.867,40.076,400,42.834,400,45.9v54.494L116.394,384.001
// H55.5c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h45.894l-9,9H31.5c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h45.894l-9,9
// H7.5c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5H64v56.5c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-60.894l9-9v45.894
// c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-60.894l9-9v45.894c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-60.894
// l283.606-283.606H465.1c3.067,0,5.825-1.867,6.963-4.714l38.4-96C511.578,7.501,510.925,4.319,508.803,2.197z M460.023,96.001
// h-34.416l35.197-35.197c2.929-2.929,2.929-7.678,0-10.606c-2.929-2.929-7.678-2.929-10.606,0L415,85.394V50.978l75.037-30.015
// L460.023,96.001z'/>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// <g>
// </g>
// </svg>`,
// };

const arrowIcon = {
  mapIconUrl: `
<svg version='1.0' xmlns='http://www.w3.org/2000/svg'
     width='25' height='25' viewBox='0 0 1280.000000 1279.000000'
     preserveAspectRatio='xMidYMid meet'>
  <metadata>
    Created by potrace 1.15, written by Peter Selinger 2001-2017
  </metadata>
  <g transform='translate(0.000000,1279.000000) scale(0.100000,-0.100000)'
     fill='#B07C4F' stroke='none'>
    <path d='M7480 12725 c-341 -51 -450 -64 -551 -64 -115 -1 -127 -3 -132 -20
-4 -15 -22 -20 -103 -31 -55 -7 -104 -17 -110 -21 -7 -6 -15 5 -23 31 l-12 40
-57 -5 c-31 -3 -293 -15 -582 -26 -289 -11 -527 -22 -529 -25 -4 -4 -3 -16 54
-494 19 -162 35 -310 35 -328 l0 -33 -93 7 -94 7 -18 -112 -18 -111 -306 0
-306 1 -200 40 c-252 51 -304 54 -1245 68 -721 11 -1507 24 -2385 40 -253 5
-463 5 -466 2 -7 -8 -64 -1209 -57 -1216 4 -5 679 -54 753 -55 l30 -1 -25 -13
c-14 -7 -166 -66 -338 -131 l-312 -119 0 -636 0 -636 358 -68 c342 -65 428
-83 390 -85 -57 -3 -734 -93 -739 -99 -14 -17 -128 -367 -122 -373 5 -4 93
-44 198 -89 104 -45 191 -83 193 -85 3 -2 -73 -54 -167 -116 l-171 -111 2
-696 3 -696 415 -72 c228 -40 413 -73 410 -74 -3 0 -211 -23 -463 -49 -252
-27 -462 -53 -466 -57 -9 -10 -237 -2291 -230 -2298 2 -2 150 7 329 20 1607
119 3016 174 4448 174 l772 0 0 -50 c0 -141 -104 -1388 -175 -2101 -61 -606
-198 -1812 -219 -1931 l-5 -28 974 0 c643 0 975 3 975 10 0 6 133 10 380 10
l380 0 0 28 c0 15 -5 131 -10 257 -32 778 -56 1820 -66 2953 l-7 742 37 0 c44
0 525 -42 811 -70 980 -99 1931 -240 2844 -425 124 -25 226 -45 228 -45 1 0 0
14 -3 30 -6 30 -6 30 41 30 62 0 819 31 822 34 3 3 -287 1740 -292 1744 -2 2
-144 6 -317 9 -172 3 -328 8 -346 12 -30 5 0 21 309 160 293 133 347 154 385
152 l44 -2 0 764 0 764 -61 7 c-34 3 -88 6 -121 6 l-59 0 3 107 3 108 165 27
c91 15 166 27 166 27 2 1 12 186 44 841 29 600 41 820 45 870 3 30 12 150 20
265 8 116 18 236 21 268 l6 57 -200 -6 -200 -7 24 133 c13 73 26 135 28 138 3
2 94 -18 203 -46 108 -28 199 -49 202 -47 3 4 40 506 37 511 -1 1 -64 10 -141
19 -77 10 -143 21 -147 24 -5 4 51 48 123 99 128 90 132 92 167 82 20 -5 38
-7 41 -4 6 6 92 1210 88 1243 -2 20 -47 46 -327 190 -300 153 -325 168 -322
190 3 20 0 23 -20 18 -22 -6 -306 -64 -1408 -292 -256 -53 -814 -168 -1240
-256 l-775 -160 -370 20 c-203 12 -376 21 -383 21 -9 0 -11 19 -7 78 2 42 9
262 15 487 6 226 13 456 16 513 l5 102 -38 -1 c-21 -1 -229 -30 -463 -64z'/>
  </g>
</svg>`,
};

export default L.divIcon({
  className: 'leaflet-data-marker',
  html: L.Util.template(arrowIcon.mapIconUrl, arrowIcon),
  iconAnchor: [0, 32],
  iconSize: [20, 25],
  popupAnchor: [10, -28],
});

export const greenIcon = L.icon({
  iconUrl: 'leaf-green.png',
  shadowUrl: 'leaf-shadow.png',

  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

export const getIcon: (
  type:
    | 'Легенды'
    | 'Предания'
    | 'Сказки'
    | 'Былички'
    | 'Озёра'
    | 'Источники'
    | 'Камни'
    | 'Другое'
) => any = (type) => {
  let currentPath = '';
  if (type === 'Легенды') currentPath = '/svg/022-witch.png';
  if (type === 'Предания') currentPath = '/svg/005-knight.png';
  if (type === 'Сказки') currentPath = '/svg/018-princess-3.png';
  if (type === 'Былички') currentPath = '/svg/024-fairy-2.png';
  if (type === 'Озёра') currentPath = '/svg/021-mermaid.png';
  if (type === 'Источники') currentPath = '/svg/030-fairy-tale.png';
  if (type === 'Камни') currentPath = '/svg/031-centaur.png';
  if (type === 'Другое') currentPath = '/svg/010-king-2.png';

  return {
    icon: L.icon({
      iconUrl: currentPath,

      iconSize: [40, 40], // size of the icon
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    }),
    path: currentPath,
  };
};

export const newCustomIcon = L.icon({
  iconUrl: '/svg/001-king.png',

  iconSize: [35, 35], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});
