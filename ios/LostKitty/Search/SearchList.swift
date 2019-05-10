//
//  SearchList.swift
//  LostKitty
//
//  Created by Jason Prasad on 5/9/19.
//  Copyright © 2019 Jason Prasad. All rights reserved.
//

import UIKit

fileprivate struct SearchListNode {
  
  let description: String?
  let forkCount: Int?
  let id: String?
  let language: (name: String, color: String)?
  let nameWithOwner: String?
  let pushedAt: String?
  let stargazers: Int?
  let topics: [String]?
  
  init(json: JSON) {
    description = json.description?.stringValue
    forkCount = json.forkCount?.intValue
    id = json.id?.stringValue
    language = json.languages?.nodes?.arrayOfJSON?.first.flatMap { ($0.name?.stringValue, $0.color?.stringValue) as? (String, String) }
    nameWithOwner = json.nameWithOwner?.stringValue
    pushedAt = json.pushedAt?.stringValue
    stargazers = json.stargazers?.totalCount?.intValue
    topics = json.repositoryTopics?.nodes?.arrayOfJSON?.compactMap { $0.topic?.stringValue }
  }
  
}

@objc(SearchList)
class SearchList: UITableView {
  
  private var results = [SearchListNode]() {
    didSet {
      reloadData()
    }
  }
  
  @objc func setResults(_ results: [String: Any]?) {
    guard let nodes = JSON(results)?.search?.edges?.arrayOfJSON?.compactMap({ $0.node }) else {
      return
    }
    
    self.results = nodes.compactMap { SearchListNode(json: $0) }
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
    let cell: UITableViewCell = .init()
    cell.textLabel?.text = results[indexPath.row].nameWithOwner
    return cell
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
