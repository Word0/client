import React, { useEffect, useRef } from 'react';

// eslint-disable-next-line react/prop-types
function Map({ x, y, shop }) {
  let map;
  const { naver } = window;
  const mapElement = useRef(null);

  const resizeMap = () => {
    const size = window.innerWidth - 55 > 480 ? 480 : window.innerWidth - 55;
    map.setSize(new naver.maps.Size(size, size));
  };

  useEffect(() => {
    window.addEventListener('resize', resizeMap);
    return () => {
      window.removeEventListener('resize', resizeMap);
    };
  }, []);

  useEffect(() => {
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(y, x);
    const mapOptions = {
      center: location,
      zoom: 13,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    map = new naver.maps.Map(mapElement.current, mapOptions);
    const size = window.innerWidth - 55 > 480 ? 480 : window.innerWidth - 55;
    map.setSize(new naver.maps.Size(size, size));

    // 마커 표시
    const marker = new naver.maps.Marker({
      position: location,
      map,
    });

    // info 창 표시
    const contentStr = `<div><p>${shop}</p></div>`;
    const infowindow = new naver.maps.InfoWindow({
      content: contentStr,
    });
    naver.maps.Event.addListener(marker, 'click', () => {
      if (infowindow.getMap()) {
        infowindow.close();
      } else {
        infowindow.open(map, marker);
      }
    });

    // infowindow.open(map, marker);
  }, [x, y]);

  return <div id="map" ref={mapElement} style={{ minHeight: '300px' }} />;
}

export default Map;
