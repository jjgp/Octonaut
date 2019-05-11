//
//  SearchListManager.swift
//  LostKitty
//
//  Created by Jason Prasad on 5/9/19.
//  Copyright © 2019 Jason Prasad. All rights reserved.
//

import UIKit

@objc(SearchListManager)
class SearchListManager: RCTViewManager {}

extension SearchListManager {
  
  static override func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  override func view() -> UIView! {
    return SearchList()
  }
  
}

extension SearchListManager {
  
  @objc func endRefreshing(_ reactTag: NSNumber) {
    bridge.uiManager.addUIBlock { uiManager, viewRegistry  in
      (viewRegistry?[reactTag] as? SearchList)?.endRefreshing()
    }
  }
  
}
