// import { useDebounceFn } from "ahooks";
import * as echarts from "echarts";
import { debounce } from "lodash";
import { useEffect, useRef } from "react";

// import echartsThemeConfig from "./theme.json";

// const echartsTheme = echartsThemeConfig.theme;

// export const echartsThemeColors = echartsTheme.color;

// 主题配置
// echarts.registerTheme("primaryTheme", echartsTheme);

export default function useCharts({ option = {}, onClick }) {
  const chartRef = useRef();
  const chart = useRef();

  // const { run } = debounce(
  //   () => {
  //     chart.current?.resize?.();
  //   },
  //   { wait: 100 }
  // );

  useEffect(() => {
    if (!chartRef.current) return;

    chart.current = echarts.init(chartRef.current, "primaryTheme");
    chart.current.setOption(option);

    // 添加图形点击事件
    if (onClick) {
      chart.current.on("click", onClick);
    }

    const resize = debounce(() => console.log(123))();
    window.addEventListener("resize", resize);
    return () => {
      chart.current?.dispose();
      window.removeEventListener("resize", resize);
    };
  }, [option]);

  return { chartRef };
}
