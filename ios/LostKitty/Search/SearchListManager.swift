//
//  SearchListManager.swift
//  LostKitty
//
//  Created by Jason Prasad on 5/9/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit

@objc(SearchListManager)
class SearchListManager: RCTViewManager {
  
  override func view() -> UIView! {
    return SearchList()
  }
  
  static override func requiresMainQueueSetup() -> Bool {
    return true
  }
  
}
