import type { AppRouteType } from '/@/router/types'

const dashboard: AppRouteType[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('/@/layouts/index.vue'),
    redirect: '/dashboard/analysis',
    meta: {
      title: '首页',
      icon: '',
      sort: 1,
    },
    children: [
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('/@/views/dashboard/analysis.vue'),
        meta: {
          title: '分析页',
          sort: 1,
          icon: '',
          affix: true,
        },
      },
      {
        path: 'workbench',
        name: 'Workbench',
        component: () => import('/@/views/dashboard/workbench.vue'),
        meta: {
          title: '工作台',
          sort: 2,
          icon: '',
        },
      },
    ],
  },
]

export default dashboard
