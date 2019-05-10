//
//  SearchList.swift
//  LostKitty
//
//  Created by Jason Prasad on 5/9/19.
//  Copyright © 2019 Jason Prasad. All rights reserved.
//

import UIKit

fileprivate struct SearchListResults {
  
  init?(json: JSON) {
    return nil
  }
  
}

@objc(SearchList)
class SearchList: UITableView {
  
  private var results: [SearchListResults]? {
    didSet {
      reloadData()
    }
  }
  
  @objc func setResults(_ results: [String: Any]?) {
    guard let edges = JSON(results)?.search?.edges?.arrayOfJSON else {
      return
    }
    
    self.results = edges.compactMap { SearchListResults(json: $0) }
  }
  
}
