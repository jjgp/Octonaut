package com.lostkitty.search

import android.view.View
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext

class SearchListManager: SimpleViewManager<View>() {

    override fun getName() = "SearchList"

    override fun createViewInstance(reactContext: ThemedReactContext): View {
        return View(reactContext)
    }

}