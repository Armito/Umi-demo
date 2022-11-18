/*
 * @Author: Armito
 * @Date: 2022-02-06 17:17:24
 * @LastEditTime: 2022-02-06 19:07:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi-demo\src\pages\Context\index.tsx
 */
import React, { useContext, useState } from 'react';
import { Space } from 'antd';
import { themes, useTheme, ThemeContext } from './hooks/useTheme';

const App = () => {
  const { theme, toggleTheme } = useTheme(themes.dark);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      <Toolbar />
    </ThemeContext.Provider>
  );
};

const Toolbar = () => {
  return (
    <Space>
      <ThemedButton themeTo="light" />
      <ThemedButton themeTo="dark" />
      <ThemedButton />
    </Space>
  );
};

const ThemedButton = (props: { themeTo?: 'light' | 'dark' }) => {
  const { themeTo } = props;
  const {
    theme: { background, foreground },
    toggleTheme,
  } = useContext(ThemeContext);
  return (
    <button
      style={{ background: background, color: foreground }}
      onClick={() => toggleTheme(themeTo)}
    >
      to {themeTo || 'toggle'}~
    </button>
  );
};

export default App;
