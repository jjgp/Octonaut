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
  
  private var results = [SearchListResults]() {
    didSet {
      reloadData()
    }
  }
  
  @objc func setResults(_ results: [String: Any]?) {
    guard let nodes = JSON(results)?.search?.edges?.arrayOfJSON?.compactMap({ $0.node }) else {
      return
    }
    
    self.results = nodes.compactMap { SearchListResults(json: $0) }
  }
  
}

// MARK:- Lifecycle

extension SearchList {
  
  override func willMove(toSuperview newSuperview: UIView?) {
    if newSuperview != nil {
      dataSource = self
      delegate = self
      refreshControl = UIRefreshControl()
      refreshControl?.addTarget(self,
                                action: #selector(onRefresh),
                                for: .valueChanged)
      tableFooterView = UIView(frame: .zero)
    }
    
    super.willMove(toSuperview: newSuperview)
  }
  
}

// MARK:- Refresh

extension SearchList {
  
  @objc func onRefresh() {
    // TODO: bubble event
  }
  
}

// MARK:- UITableViewDataSource

extension SearchList: UITableViewDataSource {
  
  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return results.count
  }
  
  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    return .init()
  }
  
}

// MARK:- UITableViewDelegate

extension SearchList: UITableViewDelegate {
  
  func scrollViewDidEndDecelerating(_ scrollView: UIScrollView) {
    // Attribution: https://stackoverflow.com/a/31454471
    let offset = scrollView.contentOffset.y + scrollView.frame.size.height
    if (offset >= scrollView.contentSize.height - 1) {
      // TODO: bubble event
    }
  }
  
  func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    defer { tableView.deselectRow(at: indexPath, animated: true) }
    
    // TODO: bubble event
  }
  
}
