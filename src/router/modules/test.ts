import type { AppRouteType } from '/@/router/types'

const about: AppRouteType[] = [
  {
    path: '/test',
    name: 'Test',
    component: () => import('/@/layouts/index.vue'),
    redirect: '/test/index',
    meta: {
      title: '测试',
      icon: '',
      sort: 3,
      hideChildren: true,
    },
    children: [
      {
        path: 'index',
        name: 'TestIndex',
        component: () => import('/@/views/test/index.vue'),
        meta: {
          title: '测试',
          sort: 1,
          icon: '',
        },
      },
    ],
  },
]

export default about
