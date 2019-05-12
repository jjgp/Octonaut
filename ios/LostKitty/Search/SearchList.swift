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
  
  @objc var hasMore = false
  @objc var onDidSelect: RCTDirectEventBlock?
  @objc var onEndReached: RCTDirectEventBlock?
  @objc var onRefresh: RCTDirectEventBlock?
  private var results = [SearchListNode]() {
    didSet {
      reloadData()
    }
  }
  
  override init(frame: CGRect, style: UITableView.Style) {
    super.init(frame: frame, style: style)
    estimatedRowHeight = 75
    dataSource = self
    delegate = self
    refreshControl = UIRefreshControl()
    refreshControl?.addTarget(self,
                              action: #selector(refreshValueChanged),
                              for: .valueChanged)
    register(SearchListCell.nib(), forCellReuseIdentifier: SearchListCell.reuseIdentifier)
    rowHeight = UITableView.automaticDimension
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
  
  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return results.count
  }
  
  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: SearchListCell.reuseIdentifier) as! SearchListCell
    let result = results[indexPath.row]
    cell.setResult(result)
    return cell
  }
  
}

extension SearchList: UITableViewDelegate {
  
  func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    defer { tableView.deselectRow(at: indexPath, animated: true) }
    let row = indexPath.row
    onDidSelect?([
      "id": results[indexPath.row].id ?? "",
      "row": row
      ])
  }
  
  func tableView(_ tableView: UITableView, willDisplay cell: UITableViewCell, forRowAt indexPath: IndexPath) {
    if hasMore, indexPath.row == tableView.numberOfRows(inSection: 0) - 1 {
      onEndReached?([:])
      let spinner = UIActivityIndicatorView(style: .gray)
      spinner.startAnimating()
      spinner.frame = CGRect(x: 0, y: 0, width: bounds.width, height: 44)
      tableFooterView = spinner
      tableFooterView?.isHidden = false
    }
  }
  
}

extension SearchListCell {
  
  fileprivate func setResult(_ result: SearchListNode) {
    titleLabel.text = result.nameWithOwner
    summaryLabel.text = result.description
    if let (name, color) = result.language {
      languageLabel.text = name
      languageImageView.tintColor = UIColor(hex: color)
    } else {
      languageStackView.isHidden = true
    }
    if let stargazers = result.stargazers.map({ String($0) }) {
      starsLabel.text = stargazers
    } else {
      starsStackView.isHidden = true
    }
    if let timeAgo = result.pushedAt {
      let dateFormatter = DateFormatter()
      dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ssZ"
      dateFormatter.timeZone = TimeZone(abbreviation: "UTC")
      timeAgoLabel.text = dateFormatter.date(from: timeAgo)?.timeAgo()
    } else {
      timeAgoStackView.isHidden = true
    }
  }
  
  override func prepareForReuse() {
    languageStackView.isHidden = false
    starsStackView.isHidden = false
    timeAgoImageView.isHidden = false
  }
  
}
