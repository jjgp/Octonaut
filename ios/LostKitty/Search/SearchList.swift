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
  
  @objc var onEndReached: RCTDirectEventBlock?
  @objc var onRefresh: RCTDirectEventBlock?
  private var results = [SearchListNode]() {
    didSet {
      reloadData()
    }
  }
  
  override init(frame: CGRect, style: UITableView.Style) {
    super.init(frame: frame, style: style)
    dataSource = self
    delegate = self
    refreshControl = UIRefreshControl()
    refreshControl?.addTarget(self,
                              action: #selector(refreshValueChanged),
                              for: .valueChanged)
    register(SearchListCell.nib(), forCellReuseIdentifier: SearchListCell.reuseIdentifier)
    tableFooterView = UIView(frame: .zero)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
}

extension SearchList {
  
  func endRefreshing() {
    refreshControl?.endRefreshing()
  }
  
  @objc func setResults(_ results: [String: Any]?) {
    guard let nodes = JSON(results)?.search?.edges?.arrayOfJSON?.compactMap({ $0.node }) else {
      return
    }
    self.results = nodes.compactMap { SearchListNode(json: $0) }
  }
  
}

extension SearchList {
  
  @objc func refreshValueChanged() {
    onRefresh?([:])
  }
  
}

extension SearchList: UITableViewDataSource {
  
  func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
    return 75
  }
  
  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return results.count
  }
  
  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: SearchListCell.reuseIdentifier) as! SearchListCell
    let result = results[indexPath.row]
    cell.title.text = result.nameWithOwner
    cell.summary.text = result.description
    return cell
  }
  
}

extension SearchList: UITableViewDelegate {
  
  func scrollViewDidEndDecelerating(_ scrollView: UIScrollView) {
    // Attribution: https://stackoverflow.com/a/31454471
    let offset = scrollView.contentOffset.y + scrollView.frame.size.height
    if (offset >= scrollView.contentSize.height - 1) {
      onEndReached?([:])
    }
  }
  
  func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    defer { tableView.deselectRow(at: indexPath, animated: true) }
    
    // TODO: bubble event
  }
  
}
