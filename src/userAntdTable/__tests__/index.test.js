import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Form, Input, Button, Table } from 'antd';
import useTable from '../index';

describe('useTable', () => {
  let getUserList;
  let UserList;

  beforeEach(() => {
    getUserList = () =>
      Promise.resolve({
        pagination: {
          current: 1,
          total: 10,
          pageSize: 5,
        },
        list: [
          { id: 1, name: 'name1' },
          { id: 2, name: 'name2' },
          { id: 3, name: 'name3' },
          { id: 4, name: 'name4' },
          { id: 5, name: 'name4' },
          { id: 6, name: 'name6' },
          { id: 7, name: 'name7' },
          { id: 8, name: 'name8' },
          { id: 9, name: 'name9' },
          { id: 10, name: 'name10' },
        ],
      });

    UserList = Form.create()(props => {
      const { getFieldDecorator } = props.form;
      const {
        table: { data, loading, changeTable },
        form: { search, searchType, changeSearchType },
      } = useTable({ form: props.form, service: props.service });
      const { pagination = {}, list = [] } = data || {};

      const columns = [
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name',
        },
      ];

      const searchFrom = (
        <Form>
          <Form.Item label="关键字">
            {getFieldDecorator('keywords', {
              initialValue: '模糊查询关键字',
            })(<Input placeholder="请输入关键字" />)}
          </Form.Item>
          <a onClick={changeSearchType} className="changeSearchType">
            高级搜索
          </a>
          <Button type="primary" onClick={search}>
            搜索
          </Button>
        </Form>
      );

      // 高级搜索
      const advanceSearchForm = (
        <Form>
          <Form.Item label="关键字">
            {getFieldDecorator('keywords', {
              initialValue: '模糊查询关键字',
            })(<Input placeholder="请输入关键字" />)}
          </Form.Item>
          <Form.Item label="id">
            {getFieldDecorator('name', {
              initialValue: 'name默认值',
            })(<Input placeholder="其他" />)}
          </Form.Item>
          <a onClick={changeSearchType} className="changeSearchType">
            简单搜索
          </a>
          <Button type="primary" onClick={search}>
            搜索
          </Button>
        </Form>
      );

      return (
        <div>
          {searchType === 'simple' ? searchFrom : advanceSearchForm}
          <Table
            columns={columns}
            loading={loading}
            showHeader={false}
            onChange={changeTable}
            pagination={pagination}
            dataSource={list.map((d, index) => ({ ...d, key: index }))}
          />
        </div>
      );
    });
  });

  describe('init', () => {
    it('fetch first page data after render', () => {
      let queryArgs;
      getUserList = args => {
        queryArgs = args;
        return Promise.resolve({
          pagination: {
            current: 1,
            total: 0,
            pageSize: 5,
          },
          list: [],
        });
      };

      mount(<UserList service={getUserList} />);

      expect(queryArgs).toEqual({ current: 1 });
    });

    it('searchType is simple', () => {
      const component = mount(<UserList service={getUserList} />);
      expect(component.find('.changeSearchType').text()).toEqual('高级搜索');
    });
  });

  describe('searchType', () => {
    it('change to advance', () => {
      const component = mount(<UserList service={getUserList} />);
      component.find('.changeSearchType').simulate('click');

      expect(component.find('.changeSearchType').text()).toBe('简单搜索');
    });

    it('change to simple', () => {
      const component = mount(<UserList service={getUserList} />);

      component.find('.changeSearchType').simulate('click');
      component.find('.changeSearchType').simulate('click');

      expect(component.find('.changeSearchType').text()).toBe('高级搜索');
    });
  });

  describe('search', () => {
    it('simple', () => {
      let queryArgs;
      getUserList = args => {
        queryArgs = args;
        return Promise.resolve({
          pagination: {
            current: 1,
            total: 0,
            pageSize: 5,
          },
          list: [],
        });
      };

      const component = mount(<UserList service={getUserList} />);
      component.find('button').simulate('click');

      expect(queryArgs).toEqual({ current: 1, keywords: '模糊查询关键字' });
    });

    it('advance', () => {
      let queryArgs;
      getUserList = args => {
        queryArgs = args;
        return Promise.resolve({
          pagination: {
            current: 1,
            total: 0,
            pageSize: 5,
          },
          list: [],
        });
      };

      const component = mount(<UserList service={getUserList} />);
      component.find('.changeSearchType').simulate('click');
      component.find('button').simulate('click');

      expect(queryArgs).toEqual({
        current: 1,
        keywords: '模糊查询关键字',
        name: 'name默认值',
      });
    });

    it('reset page number', () => {
      let queryArgs;
      getUserList = args => {
        queryArgs = args;
        return Promise.resolve({
          pagination: {
            current: args.current,
            total: 10,
            pageSize: 5,
          },
          list: [
            { id: 1, name: 'name1' },
            { id: 2, name: 'name2' },
            { id: 3, name: 'name3' },
            { id: 4, name: 'name4' },
            { id: 5, name: 'name4' },
            { id: 6, name: 'name6' },
            { id: 7, name: 'name7' },
            { id: 8, name: 'name8' },
            { id: 9, name: 'name9' },
            { id: 10, name: 'name10' },
          ],
        });
      };

      const component = mount(<UserList service={getUserList} />);

      // 翻页
      act(() =>
        component
          .find('Table')
          .at(0)
          .prop('onChange')({ current: 2 }),
      );

      // 根据关键词搜索
      component
        .find('input')
        .at(0)
        .simulate('change', { target: { value: '用户' } });
      act(() =>
        component
          .find('button')
          .at(0)
          .prop('onClick')(),
      );

      expect(queryArgs).toEqual({ current: 1, keywords: '用户' });
    });
  });

  describe('changeTable', () => {
    it('change page number', () => {
      let queryArgs;
      getUserList = args => {
        queryArgs = args;
        return Promise.resolve({
          pagination: {
            current: args.current,
            total: 10,
            pageSize: 5,
          },
          list: [
            { id: 1, name: 'name1' },
            { id: 2, name: 'name2' },
            { id: 3, name: 'name3' },
            { id: 4, name: 'name4' },
            { id: 5, name: 'name4' },
            { id: 6, name: 'name6' },
            { id: 7, name: 'name7' },
            { id: 8, name: 'name8' },
            { id: 9, name: 'name9' },
            { id: 10, name: 'name10' },
          ],
        });
      };

      const component = mount(<UserList service={getUserList} />);

      // 触发 table onChange
      act(() =>
        component
          .find('Table')
          .at(0)
          .prop('onChange')({ current: 2 }),
      );

      expect(queryArgs).toEqual({ current: 2 });
    });

    it('with keywords', () => {
      let queryArgs;
      getUserList = args => {
        queryArgs = args;
        return Promise.resolve({
          pagination: {
            current: args.current,
            total: 10,
            pageSize: 5,
          },
          list: [
            { id: 1, name: 'name1' },
            { id: 2, name: 'name2' },
            { id: 3, name: 'name3' },
            { id: 4, name: 'name4' },
            { id: 5, name: 'name4' },
            { id: 6, name: 'name6' },
            { id: 7, name: 'name7' },
            { id: 8, name: 'name8' },
            { id: 9, name: 'name9' },
            { id: 10, name: 'name10' },
          ],
        });
      };

      const component = mount(<UserList service={getUserList} />);

      // 输入搜索关键字
      component
        .find('input')
        .at(0)
        .simulate('change', { target: { value: '用户名' } });
      act(() =>
        component
          .find('button')
          .at(0)
          .prop('onClick')(),
      );

      expect(queryArgs).toEqual({ current: 1, keywords: '用户名' });
    });

    it('change page number with keywords', () => {
      let queryArgs;
      getUserList = args => {
        queryArgs = args;
        return Promise.resolve({
          pagination: {
            current: args.current,
            total: 10,
            pageSize: 5,
          },
          list: [
            { id: 1, name: 'name1' },
            { id: 2, name: 'name2' },
            { id: 3, name: 'name3' },
            { id: 4, name: 'name4' },
            { id: 5, name: 'name4' },
            { id: 6, name: 'name6' },
            { id: 7, name: 'name7' },
            { id: 8, name: 'name8' },
            { id: 9, name: 'name9' },
            { id: 10, name: 'name10' },
          ],
        });
      };

      const component = mount(<UserList service={getUserList} />);

      // 输入关键字搜索
      component
        .find('input')
        .at(0)
        .simulate('change', { target: { value: '用户名' } });
      act(() =>
        component
          .find('button')
          .at(0)
          .prop('onClick')(),
      );
      // 翻页
      act(() =>
        component
          .find('Table')
          .at(0)
          .prop('onChange')({ current: 2 }),
      );

      expect(queryArgs).toEqual({ current: 2, keywords: '用户名' });
    });

    it('focus update current page with keywords', () => {
      let queryArgs;
      getUserList = args => {
        queryArgs = args;
        return Promise.resolve({
          pagination: {
            current: args.current,
            total: 10,
            pageSize: 5,
          },
          list: [
            { id: 1, name: 'name1' },
            { id: 2, name: 'name2' },
            { id: 3, name: 'name3' },
            { id: 4, name: 'name4' },
            { id: 5, name: 'name4' },
            { id: 6, name: 'name6' },
            { id: 7, name: 'name7' },
            { id: 8, name: 'name8' },
            { id: 9, name: 'name9' },
            { id: 10, name: 'name10' },
          ],
        });
      };

      const component = mount(<UserList service={getUserList} />);

      // 输入关键字搜索
      component
        .find('input')
        .at(0)
        .simulate('change', { target: { value: '用户名' } });
      act(() =>
        component
          .find('button')
          .at(0)
          .prop('onClick')(),
      );
      // 翻页
      act(() =>
        component
          .find('Table')
          .at(0)
          .prop('onChange')({ current: 2 }),
      );

      // 强制刷新当前页
      act(() =>
        component
          .find('Table')
          .at(0)
          .prop('onChange')({ current: 2, focusUpdate: true }),
      );

      expect(queryArgs).toEqual({ current: 2, keywords: '用户名' });
    });
  });
});
