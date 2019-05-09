//
//  SearchList.swift
//  LostKitty
//
//  Created by Jason Prasad on 5/9/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit

@objc(SearchList)
class SearchList: UITableView {
  
  @objc var results: [String: Any]? {
    didSet {
      print(results)
    }
  }
  
}
