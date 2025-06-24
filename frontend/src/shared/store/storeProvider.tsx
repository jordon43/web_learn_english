'use client'
import {ReactNode, useRef} from 'react'
import {Provider} from 'react-redux'
import {store} from "@/shared/store/store";
// import {makeStore, AppStore} from '@/shared/store/store'

type ProviderProps = {
  children: Readonly<ReactNode>
}

export const Providers = ({children}: ProviderProps) => {
  // const storeRef = useRef<AppStore | null>(null)
  // if (!storeRef.current) {
  //   storeRef.current = makeStore()
  // }

  return <Provider store={store}>{children}</Provider>
}