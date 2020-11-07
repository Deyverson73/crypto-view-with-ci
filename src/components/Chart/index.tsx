import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode, ISeriesApi } from "lightweight-charts";
import "./index.css";
import { Legend } from "../Legend";
import { cryptoHttp } from "../../http";

interface ChartProps {
  coin: string;
}

export const Chart: React.FC<ChartProps> = (props) => {
  const { coin } = props;
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const candleSeriesRef = useRef() as React.MutableRefObject<
    ISeriesApi<"Candlestick">
  >;

  const [prices, setPrices] = useState([]);
  const [chartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    cryptoHttp
      .get(`histoday?fsym=${coin}&tsym=BRL&limit=300`)
      .then((response) => {
        const prices = response.data.Data.map((row: any) => ({
          time: row.time,
          low: row.low,
          high: row.high,
          open: row.open,
          close: row.close,
          volume: row.volumefrom,
        }));
        setPrices(prices);
      });
  }, [coin]);

  useEffect(() => {
    if (candleSeriesRef.current) {
      candleSeriesRef.current.setData(prices);
    }
  }, [prices]);

  useEffect(() => {
    setPrices([])
  },[coin])

  useEffect(() => {
    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      layout: {
        backgroundColor: "#253248",
        textColor: "rgba(255,255,255,0.9)",
      },
      grid: {
        vertLines: {
          color: "#334158",
        },
        horzLines: {
          color: "#334158",
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      //@ts-ignore
      priceScale: {
        borderColor: "#485c7b",
      },
      timeScale: {
        borderColor: "#485c7b",
      },
    });

    candleSeriesRef.current = chart.addCandlestickSeries({
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderDownColor: "#ff4976",
      borderUpColor: "#4bffb5",
      wickDownColor: "#838ca1",
      wickUpColor: "#838ca1",
    });
    setChartLoaded(true);
  }, [coin, chartLoaded]);

  return (
    <div className="Chart" ref={containerRef}>
      <Legend legend={coin} />
    </div>
  );
};
