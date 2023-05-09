import Mock from 'mockjs';
import dayjs from 'dayjs';
import qs from 'query-string';
import setupMock from '@/utils/setupMock';

const legend = ['活跃用户数', '汽车总数量', '用户点击量', '平台推广数'];
const count = [0, 600, 500, 500, 2000];
const category = ['平台用户', '其他工具', '步行'];
const getLineData = (name, index) => {
  const { list } = Mock.mock({
    'list|10': [
      {
        'id|+1': 1,
        time: function () {
          return dayjs().subtract(this.id, 'days').format('MM-DD');
        },
        count: () => Mock.Random.natural(count[index], count[index + 1]),
        name: name,
      },
    ],
  });
  return list.map((item) => {
    delete item.id;
    return item;
  });
};

const mockLine = (name) => {
  const result = new Array(12).fill(0).map(() => ({
    y: Mock.Random.natural(100, 2000),
  }));
  return result
    .sort((a, b) => a.y - b.y)
    .map((item, index) => ({
      ...item,
      x: index,
      name,
    }));
};

const getContentSource = (name) => {
  const typeList = ['青年人', '中年人', '老年人', '上班族', '其他'];
  const result = [];
  typeList.forEach((type) => {
    result.push({
      type,
      value: Mock.Random.natural(100, 10000),
      name,
    });
  });
  const total = result.reduce((a, b) => a + b.value, 0);
  return result.map((item) => ({
    ...item,
    value: Number((item.value / total).toFixed(2)),
  }));
};

setupMock({
  setup: () => {
    Mock.mock(new RegExp('/api/multi-dimension/overview'), () => {
      const { array: overviewData } = Mock.mock({
        'array|4': [
          function () {
            return Mock.Random.natural(0, 2000);
          },
        ],
      });
      let list = [];
      legend.forEach(
        (name, index) => (list = list.concat(getLineData(name, index)))
      );
      return {
        overviewData,
        chartData: list,
      };
    });

    Mock.mock(new RegExp('/api/multi-dimension/activity'), () => {
      const { list } = Mock.mock({
        'list|3': [
          {
            'name|+1': ['平台分享量', '平台评论量', '平台好评量'],
            count: () => Mock.Random.natural(100, 2000),
          },
        ],
      });
      return list;
    });

    Mock.mock(new RegExp('/api/multi-dimension/polar'), () => {
      const items = ['青年人', '中年人', '老年人', '上班族', '男性', '女性'];

      const getCategoryCount = () => {
        const result = {};
        category.forEach((name) => {
          result[name] = Mock.Random.natural(0, 100);
        });

        return result;
      };

      return {
        list: items.map((item) => ({
          item,
          ...getCategoryCount(),
        })),
        fields: category,
      };
    });

    Mock.mock(new RegExp('/api/multi-dimension/card'), (params) => {
      const { type } = qs.parseUrl(params.url).query;
      return Mock.mock({
        count: () => Mock.Random.natural(100, 1500),
        increment: () => Mock.Random.boolean(),
        diff: () => Mock.Random.natural(100, 1000),
        chartType: type,
        chartData: () => {
          return mockLine('类目1');
        },
      });
    });

    Mock.mock(new RegExp('/api/multi-dimension/content-source'), () => {
      const allList = category.map((name) => {
        return getContentSource(name).map((item) => ({
          ...item,
          category: name,
        }));
      });
      return allList.flat();
    });
  },
});
