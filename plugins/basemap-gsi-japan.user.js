// ==UserScript==
// @id             iitc-plugin-basemap-gsi-japan
// @name           IITC plugin: GSI map tiles (Japan Only)
// @category       Map Tiles
// @version        0.2.5.@@DATETIMEVERSION@@
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      @@UPDATEURL@@
// @downloadURL    @@DOWNLOADURL@@
// @description    [@@BUILDNAME@@-@@BUILDDATE@@] Add the map tiles provided by Geospatial Information Authority of Japan as optional layers. Available only in Japan.
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @include        https://*.ingress.com/mission/*
// @include        http://*.ingress.com/mission/*
// @match          https://*.ingress.com/mission/*
// @match          http://*.ingress.com/mission/*
// @grant          none
// ==/UserScript==

@@PLUGINSTART@@

// PLUGIN START ////////////////////////////////////////////////////////

// Map data © 国土地理院 (The Geospatial Information Authority of Japan)
//
// The bathymetric contours are derived from those contained within the GEBCO
// Digital Atlas, published by the BODC on behalf of IOC and IHO (2003)
// (http://www.gebco.net)
//
// 海上保安庁許可第２２２５１０号（水路業務法第２５条に基づく類似刊行物）
//
// GSI's terms of use: http://www.gsi.go.jp/ENGLISH/page_e30286.html
//
// > The Terms of Use are compatible with the Creative Commons Attribution
// > License 4.0 (hereinafter referred to as the CC License). This means that
// > Content based on the Terms of Use may be used under the CC License in
// > lieu of the Terms of Use.

// use own namespace for plugin
window.plugin.mapTileGsiJapan = {
  addLayers: function() {

    // Register the GSI map tiles as base layers.

    var basicOptions = {
      minZoom:       5,
      maxZoom:       21,
      maxNativeZoom: 18,
      detectRetina:  true
    };
    var layerAttributes = [
      { layerName: 'GSI of Japan (Standard)', tileName: '標準地図', directory: 'std'  },
      { layerName: 'GSI of Japan (Pale)',     tileName: '淡色地図', directory: 'pale' },
    ];

    layerAttributes.forEach(function (attr) {
      layerChooser.addBaseLayer(
        new L.TileLayer(
          'https://cyberjapandata.gsi.go.jp/xyz/' + attr.directory + '/{z}/{x}/{y}.png',
          $.extend(basicOptions, {
            attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html">'
                         + '地理院タイル (' + attr.tileName + ')</a>',
          })
        ),
        attr.layerName
      );
    });
  },
};

var setup = window.plugin.mapTileGsiJapan.addLayers;

// PLUGIN END //////////////////////////////////////////////////////////


@@PLUGINEND@@
