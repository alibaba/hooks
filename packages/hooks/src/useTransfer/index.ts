import { useState, useMemo, useCallback } from 'react';

export interface ReturnValue<Item> {
  transferProps: {
    dataSource: Item[];
    targetKeys: string[];
    selectedKeys: string[];
    disabled: boolean;
    showSearch: boolean;
    filterOption: any;
    onChange: (nextTargetKeys: string[], direction: string, moveKeys: string[]) => void;
    onSelectChange: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
  };
  noTargetKeys: string[];
  unSelectedKeys: string[];
  setTargetKeys: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedKeys: React.Dispatch<React.SetStateAction<string[]>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  leftAll: () => void;
  rightAll: () => void;
  selectAll: () => void;
  unSelectAll: () => void;
}

export interface TransferItem {
  key: string;
  [name: string]: any;
}

export interface Options {
  defaultTargetKeys?: string[];
  defaultSelectedKeys?: string[];
  defaultDisabled?: boolean;
  deafultShowSearch?: boolean;
  onChange?: (nextTargetKeys: string[], direction: string, moveKeys: string[]) => void;
}

const useTransfer = <Item extends TransferItem>(
  dataSource: Item[],
  options: Options = {},
): ReturnValue<Item> => {
  const {
    defaultTargetKeys = [],
    defaultSelectedKeys = [],
    defaultDisabled = false,
    deafultShowSearch = false,
  } = options;
  const [targetKeys, setTargetKeys] = useState(defaultTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState(defaultSelectedKeys);
  const [disabled, setDisabled] = useState(defaultDisabled);
  const [showSearch, setShowSearch] = useState(deafultShowSearch);
  const noTargetKeys = useMemo(
    () => dataSource.filter((d) => !targetKeys.includes(d.key)).map((d) => d.key),
    [dataSource, targetKeys],
  );
  const unSelectedKeys = useMemo(
    () => dataSource.filter((d) => !selectedKeys.includes(d.key)).map((d) => d.key),
    [dataSource, selectedKeys],
  );

  const { leftAll, unSelectAll } = useMemo(() => {
    const leftAll = () => {
      setTargetKeys([]);
    };

    const unSelectAll = () => {
      setSelectedKeys([]);
    };

    return { leftAll, unSelectAll };
  }, []);

  const { rightAll, selectAll } = useMemo(() => {
    const rightAll = () => {
      setTargetKeys(dataSource.map((d) => d.key));
    };

    const selectAll = () => {
      setSelectedKeys(dataSource.map((d) => d.key));
    };

    return { rightAll, selectAll };
  }, []);

  const handleChange = useCallback(
    (nextTargetKeys: string[], direction: string, moveKeys: string[]) => {
      setTargetKeys(nextTargetKeys);
      if (options.onChange) {
        options.onChange(nextTargetKeys, direction, moveKeys);
      }
    },
    [options.onChange],
  );

  const handleSelectChange = useCallback(
    (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
      setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    },
    [],
  );

  return {
    transferProps: {
      dataSource,
      targetKeys,
      selectedKeys,
      disabled,
      filterOption: (inputValue: string, option: any) =>
        option.description.indexOf(inputValue) > -1,
      showSearch,
      onChange: handleChange,
      onSelectChange: handleSelectChange,
    },
    noTargetKeys,
    unSelectedKeys,
    setTargetKeys,
    setSelectedKeys,
    setDisabled,
    setShowSearch,
    leftAll,
    rightAll,
    selectAll,
    unSelectAll,
  };
};

export default useTransfer;
