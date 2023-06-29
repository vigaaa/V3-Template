import type { AppRouteType } from '/@/router/types'

const icon: AppRouteType[] = [
  {
    path: '/icon',
    name: 'Icon',
    component: () => import('/@/layouts/index.vue'),
    redirect: '/icon/index',
    meta: {
      title: '图标',
      icon: '',
      sort: 4,
      hideChildren: true,
      permission: 'admin_icon',
    },
    children: [
      {
        path: 'index',
        name: 'IconIndex',
        component: () => import('/@/views/icon/index.vue'),
        meta: {
          title: '图标',
          sort: 1,
          icon: '',
        },
      },
    ],
  },
]

export default icon
