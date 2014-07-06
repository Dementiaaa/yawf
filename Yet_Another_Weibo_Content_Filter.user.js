// ==UserScript==
// @name        Yet Another Weibo Content Filter
// @namespace   http://userscripts.org/users/ts
// @description 新浪微博根据关键词、作者、话题、来源过滤微博；改造版面。 filter Sina Weibo by keywords, original, topic, and source; reform layout
// @include     http://weibo.com/*
// @include     http://www.weibo.com/*
// @version     0.0.4
// @grant       GM_xmlhttpRequest
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// @grant       unsafeWindow
// @run-at      document-start
// ==/UserScript==

// 图片
var images = {
  'filter': 'data:image/png;base64,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0p8zAAA8yGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMjEgNzkuMTU0OTExLCAyMDEzLzEwLzI5LTExOjQ3OjE2ICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNC0wNi0yNFQxNDo0OCswODowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTQtMDYtMjRUMTU6MzI6MjgrMDg6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE0LTA2LTI0VDE1OjMyOjI4KzA4OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDo4Y2RlZDA5MS03MmQwLWI4NGYtODdmZC1jNzI3ZTdkNzQ1YzY8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPnhtcC5kaWQ6OGNkZWQwOTEtNzJkMC1iODRmLTg3ZmQtYzcyN2U3ZDc0NWM2PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6MTNlMzg1NmYtMmNhOS1hNjQ3LThjYjQtMGM0ZDllZjk4OWMyPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjEzZTM4NTZmLTJjYTktYTY0Ny04Y2I0LTBjNGQ5ZWY5ODljMjwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNC0wNi0yNFQxNDo0OCswODowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmRlcml2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnBhcmFtZXRlcnM+Y29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjhjZGVkMDkxLTcyZDAtYjg0Zi04N2ZkLWM3MjdlN2Q3NDVjNjwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNC0wNi0yNFQxNTozMjoyOCswODowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8eG1wTU06RGVyaXZlZEZyb20gcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICA8c3RSZWY6aW5zdGFuY2VJRD54bXAuaWlkOjEzZTM4NTZmLTJjYTktYTY0Ny04Y2I0LTBjNGQ5ZWY5ODljMjwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDoxM2UzODU2Zi0yY2E5LWE2NDctOGNiNC0wYzRkOWVmOTg5YzI8L3N0UmVmOmRvY3VtZW50SUQ+CiAgICAgICAgICAgIDxzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDoxM2UzODU2Zi0yY2E5LWE2NDctOGNiNC0wYzRkOWVmOTg5YzI8L3N0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPnNSR0IgSUVDNjE5NjYtMi4xPC9waG90b3Nob3A6SUNDUHJvZmlsZT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTY8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTY8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PkSa0OEAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAghJREFUeNqkk0FrE0EUx/9vZiewpIEEC0GzYFzaUwO9SrwJFb+Dp4p4UdCvIupF9OrJsyAeBUGFBtJtsoWkJZAolJqsutl1k5l5HpJUWluodK7D+70f7/0fMTMu8hwA0Fq/BrBsjCEhBM3/TpIJAKy1LKVkZh4opTYdAMiyzM+yjPr9/o8oiqa5XM5xHIcWdkSE6XRqtda6VCo5nucVpZRLSqmZwc7OzoHv+5dc1+0Oh8P37Xb7exRF+Xw+DwAYj8coFotj3/fLrutuTCaTpU6n861er88AQRA811rfXV9fv7a6urq8srLydjAY/G40GgCAer2OSqWS9zxvM47jq41GYz8MwxdHAK31u1arlTDzo1qtdsfzvGXP816Wy+UDAKhWq1cA3BuNRhvb29tfd3d3nzDz56MhCiFgjPkQhqExxjxcW1u7XSgUUK1WXwGQWZbdj+P4ZrPZ3O92u0+Z+YsQ4u8WAEBKCWPMx729PSOEeFCr1W5Zax0AuSRJbgRB0On1es+stVuL4mOAhUmapp+SJLnMzI/jOL5ORA4Am6bpmzRNt5RSx3YrTgaDmaGUOiSi2BhjmdkS0S+l1OFpoXPOCJgFcDDjsSQifUqwzgYwswbwEwATkQQwBaDPDZh3tPOuxDN3/T8GmBdYZjZEZBa3cN4ZMDMrZhbMLK21GQBL9C+DLnrOfwYArLwQaGGp+L8AAAAASUVORK5CYII=',
};

// 多行字符串
var funcStr = function (f) {
  var s = f.toString().split(/\r\n|\r|\n/g).slice(1, -1).join('\n');
  return s;
};

// 文本常量
// 所有文本以简体中文为准，别的都是我瞎编的
// http://zh.wikipedia.org/wiki/Template:CGroup/IT
// http://www.microsoft.com/Language/zh-cn/Search.aspx
var text = {
  'filter': { 'zh-cn': '过滤器', 'zh-hk': '篩選器', 'zh-tw': '篩選器', 'en': 'Filter' },
  'configDialogTitle': { 'zh-cn': '过滤器设置', 'zh-hk': '篩選器設定', 'zh-tw': '篩選器設定', 'en': 'Filter Settings' },
  'configApplyButton': { 'zh-cn': '应用', 'zh-hk': '套用', 'zh-tw': '套用', 'en': 'Apply' },
  'configSaveButton': { 'zh-cn': '保存', 'zh-hk': '儲存', 'zh-tw': '儲存', 'en': 'Save' },
  'configCancelButton': { 'zh-cn': '取消', 'zh-hk': '取消', 'zh-tw': '取消', 'en': 'Cancel' },
  'configStringsAdd': { 'zh-cn': '添加', 'zh-hk': '新增', 'zh-tw': '新增', 'en': 'Add' },
  'configUsersAdd': { 'zh-cn': '添加', 'zh-hk': '新增', 'zh-tw': '新增', 'en': 'Add' },
  'weiboFilterDelete': { 'zh-cn': '删除', 'zh-hk': '刪除', 'zh-tw': '刪除', 'en': 'Delete' },
  'weiboFilterClear': { 'zh-cn': '删除', 'zh-hk': '刪除', 'zh-tw': '刪除', 'en': 'Delete' },
  'keywordFilterGroupTitle': { 'zh-cn': '关键词', 'zh-hk': '關鍵字', 'zh-tw': '關鍵字', 'en': 'Keyword' },
  'keywordFilterDesc': { 'zh-cn': '关键词', 'zh-hk': '關鍵字', 'zh-tw': '關鍵字', 'en': 'Keyword' },
  'keywordFilterBlacklist': { 'zh-cn': '隐藏包含以下关键词的微博', 'zh-hk': '隱藏包含以下關鍵字的微博', 'zh-tw': '隱藏包含以下關鍵字的微博', 'en': 'Hide Weibo with these keywords' },
  'regexpFilterGroupTitle': { 'zh-cn': '正则式', 'zh-hk': '正則式', 'zh-tw': '正規式', 'en': 'Regexp' },
  'regexpFilterBlacklist': { 'zh-cn': '隐藏匹配以下正则表达式的微博', 'zh-hk': '隱藏匹配以下正則表達式的微博', 'zh-tw': '隱藏匹配以下正規表示式的微博', 'en': 'Hide Weibo matches these regular expressions' },
  'regexpFilterDesc': { 'zh-cn': '正则式', 'zh-hk': '正則式', 'zh-tw': '正規式', 'en': 'Regexp' },
  'regexpFilterRemark': { 'zh-cn': '书写时不需要对“/”字符转义', 'zh-hk': '書寫時不需要對“/”字符轉義', 'zh-tw': '書寫時不需要對“/”字符轉義', 'en': 'Do not escape "\" in your regexp.' },
  'accountFilterGroupTitle': { 'zh-cn': '帐号', 'zh-hk': '帳號', 'zh-tw': '帳號', 'en': 'Account' },
  'accountNotExistErrorTitle': { 'zh-cn': '帐号不存在', 'zh-hk': '帳號不存在', 'zh-tw': '帳號不存在', 'en': 'Account does not exist' },
  'accountNotExistError': { 'zh-cn': '不存在名为{{name}}的账号', 'zh-hk': '不存在名為{{name}}的賬號', 'zh-tw': '不存在名為{{name}}的賬號', 'en': 'Account named {{name}} does not exist' },
  'accountFilterBlacklist': { 'zh-cn': '隐藏来自以下帐号的微博', 'zh-hk': '隱藏來自以下帳號的微博', 'zh-tw': '隱藏來自以下帳號的微博', 'en': 'Hide Weibo from these accounts' },
  'originalFilterGroupTitle': { 'zh-cn': '原创', 'zh-hk': '原創', 'zh-tw': '原創', 'en': 'Original' },
  'originalFilterDesc': { 'zh-cn': '帐号', 'zh-hk': '帳號', 'zh-tw': '帳號', 'en': 'Account' },
  'originalFilterBlacklist': { 'zh-cn': '隐藏转发自以下账号的微博', 'zh-hk': '隱藏轉發自以下帳號的微博', 'zh-tw': '隱藏轉發自以下帳號的微博', 'en': 'Hide Weibo forwarded from these accounts' },
  'mentionFilterGroupTitle': { 'zh-cn': '提到', 'zh-hk': '提到', 'zh-tw': '提到', 'en': 'Mention' },
  'mentionFilterDesc': { 'zh-cn': '帐号', 'zh-hk': '帳號', 'zh-tw': '帳號', 'en': 'Account' },
  'mentionFilterBlacklist': { 'zh-cn': '隐藏提到以下账号的微博', 'zh-hk': '隱藏提到以下帳號的微博', 'zh-tw': '隱藏提到以下帳號的微博', 'en': 'Hide Weibo mentioned these accounts' },
  'topicFilterGroupTitle': { 'zh-cn': '话题', 'zh-hk': '話題', 'zh-tw': '話題', 'en': 'Topic' },
  'topicFilterDesc': { 'zh-cn': '话题', 'zh-hk': '話題', 'zh-tw': '話題', 'en': 'Topic' },
  'topicFilterBlacklist': { 'zh-cn': '隐藏包含以下话题的微博', 'zh-hk': '隱藏包含以下話題的微博', 'zh-tw': '隱藏包含以下話題的微博', 'en': 'Hide Weibo with these topics' },
  'sourceFilterGroupTitle': { 'zh-cn': '来源', 'zh-hk': '來源', 'zh-tw': '來源', 'en': 'Source' },
  'sourceFilterDesc': { 'zh-cn': '来自', 'zh-hk': '來自', 'zh-tw': '來自', 'en': 'Via' },
  'sourceFilterBlacklist': { 'zh-cn': '隐藏以下来源的微博', 'zh-hk': '隱藏以下來源的微博', 'zh-tw': '隱藏以下來源的微博', 'en': 'Hide Weibo from these source' },
  'sourceFilterWarningTitle': { 'zh-cn': '默认来源', 'zh-hk': '預設來源', 'zh-tw': '預設來源', 'en': 'Default Source' },
  'sourceFilterWarning': { 'zh-cn': '不能隐藏默认来源', 'zh-hk': '不能隱藏預設來源', 'zh-tw': '不能隱藏預設來源', 'en': 'You cannot hide default source' },
  'hyperlinkFilterGroup': { 'zh-cn': '超链接', 'zh-hk': '超連結', 'zh-tw': '超連結', 'en': 'Hyperlink' },
  'otherFilterGroupTitle': { 'zh-cn': '更多', 'zh-hk': '其他', 'zh-tw': '其他', 'en': 'More' },
  'adfeedFilterDesc': { 'zh-cn': '隐藏广告微博', 'zh-hk': '隱藏廣告微博', 'zh-tw': '隱藏廣告微博', 'en': 'Hide ad Weibo' },
  'recommandFeedDesc': { 'zh-cn': '隐藏推荐微博', 'zh-hk': '隱藏建議微博', 'zh-tw': '隱藏建議微博', 'en': 'Hide recommand Weibo' },
  'followSuggestFilterDesc': { 'zh-cn': '隐藏关注推荐微博', 'zh-hk': '隱藏關注建議微博', 'zh-tw': '隱藏關注建議微博', 'en': 'Hide Following Recommended Weibo' },
  'layoutFilterGroupTitle': { 'zh-cn': '页面布局', 'zh-hk': '頁面配置', 'zh-tw': '頁面配置', 'en': 'Layout' },
  'adBlockDesc': { 'zh-cn': '隐藏广告', 'zh-hk': '隱藏廣告', 'zh-tw': '隱藏廣告', 'en': 'Hide ad' },
  'topRecomBlockDesc': { 'zh-cn': '隐藏中栏顶部推荐', 'zh-hk': '隱藏中欄頂端建議', 'zh-tw': '隱藏中欄頂端建議', 'en': 'Hide recommand at top of middle column' },
  'toolFilterGroupTitle': { 'zh-cn': '工具', 'zh-hk': '工具', 'zh-tw': '工具', 'en': 'Tool' },
  'scriptFilterGroupTitle': { 'zh-cn': '脚本', 'zh-hk': '指令碼', 'zh-tw': '指令碼', 'en': 'Script' },
};

// 页面常量
var html = {
  'icon': '<div class="gn_setting" node-type="filter"><i><a class="gn_tab gn_filter" href="#"><span class="ico">{{filter}}</span></a></i></div>',
  'configHeaderTop': '<div class="profile_tab S_line5 yawcf-config-header" node-type="yawcf-config-header"><ul class="pftb_ul S_line1">',
  'configHeaderItem': '<li class="pftb_itm S_line1 {{liclass}}"><a class="pftb_lk S_line5 S_txt1 {{aclass}}" action-type="tab_item" onclick="return false;" href="javascript:void(0);">{{name}}</a>',
  'configHeaderBottom': '</ul></div>',
  'configLayerTop': '<div node-type="yawcf-config-body" class="yawcf-config-body">',
  'configLayerItem': '<div class="{{name}} yawcf-config-layer" node-type="{{name}}" style="display: none;"></div>',
  'configLayerBottom': '</div>',
  'configFooter': '<div class="btn clearfix" node-type="yawcf-config-footer"><a node-type="apply" class="W_btn_b W_btn_b_disable" action-type="apply" href="javascript:;" style=""><span class="btn_30px W_f14">{{configApplyButton}}</span></a><a node-type="save" class="W_btn_a" action-type="save" href="javascript:;" style=""><span class="btn_30px W_f14">{{configSaveButton}}</span></a><a node-type="canncel" class="W_btn_b" action-type="cancel" href="javascript:;" style=""><span class="btn_30px W_f14">{{configCancelButton}}</span></a></div>',
  'configSubtitle': '<div class="yawcf-groupSubtitle">{{{text}}}</div>',
  'configText': '<div class="yawcf-groupText">{{{text}}}</div>',
  'configStrings': '<div class="yawcf-configStrings"><form action="#"><label><span class="yawcf-configDesc yawcf-configStringsDesc">{{{text}}}</span><input id="yawcf-{{key}}" class="W_input yawcf-configStringsInput" type="text" name="yawcf-{{key}}"></label><button id="yawcf-add-{{key}}" class="W_btn_a yawcf-configAdd" type="submit"><span>{{configStringsAdd}}</span></button></form><ul class="yawcf-configStringsItems"></ul></div>',
  'configStringsItem': '<li class="W_btn_arrow tag yawcf-configStringsItem"><span>{{[item]}}<a class="W_ico12 icon_close" href="javascript:void(0);"></a></span></li>',
  'configBoolean': '<div class="yawcf-configBoolean"><label><input id="yawcf-{{key}}" class="W_checkbox yawcf-configStringsInput" type="checkbox" name="yawcf-{{key}}"><span class="yawcf-configDesc yawcf-configStringsDesc">{{{text}}}</span></label></div>',
  'configUsers': '<div class="yawcf-configUsers"><form action="#"><label><span class="yawcf-configDesc yawcf-configUsersDesc">{{{text}}}</span><input id="yawcf-{{key}}" class="W_input yawcf-configUsersInput" type="text" name="yawcf-{{key}}"></label><button id="yawcf-add-{{key}}" class="W_btn_a yawcf-configAdd" type="submit"><span>{{configUsersAdd}}</span></button></form><ul class="yawcf-configUsersItems"></ul></div>',
  'configUsersItem': '<li class="yawcf-configUsersItem"><div class="shield_object_card"><div class="card_bg clearfix"><div class="card_pic"><span class="pic"><img class="W_face_radius" width="50" height="50" alt="" src="{{avatar}}"></span></div><div class="card_content"><div class="object_info clearfix"><p class="W_fl"><span class="object_name" uid="{{id}}" title="{{name}}">{{name}}</span></p><p class="W_fr"><a class="W_ico12 icon_close" action-data="uid={{id}}" href="javascript:void(0);"></a></p></div><div class="other_info"></div></div></div></div></li>',
};

var url = {
  'newcard': 'http://weibo.com/aj/user/newcard?type=1&{{query}}&_t=1&callback={{callback}}',
};

// 微博过滤规则
var rules = (function () {
  var list = [];
  var add = function (priority, rule) {
    list.push({ 'priority': priority, 'rule': rule });
    list.sort(function (x, y) { return x.priority - y.priority; });
  };
  var parse = function (feed) {
    var result = null;
    try {
      list.some(function (item) {
        var current = item.rule(feed);
        if (current) {
          result = current;
          console.log('%o(%o) -> %s', item.rule, feed, current);
        }
        return result;
      });
    } catch (e) { debug(e); }
    return result;
  };
  return {
    'add': add,
    'parse': parse,
  };
}());

// 根据用户界面上的语言做不同调整
var i18n = (function () {
  var defaultLang = 'zh-cn';
  var lang = null;
  var pending = [];
  var chose = function (langObj) {
    langObj.local = langObj[lang] || langObj[defaultLang];
  };
  var langs = function (langObj) {
    pending.push(langObj);
  };
  var setLang = function (l) {
    lang = l;
    pending.map(chose);
    pending = [];
    i18n = chose;
    i18n.lang = l;
  };
  langs.setLang = setLang;
  return langs;
}());

// 将字符串用&#dd的形式转义
var escapeXml = function (s) {
  return s.replace(/./g, function (c) { return '&#' + c.charCodeAt(0); });
};

// 以参数填充字符串
var fillStr = function (base) {
  var datas = Array.apply(Array, arguments).slice(1).concat([text]);
  return base.replace(/{{([\[{]?([a-zA-Z0-9_-]*)[\]}]?)}}/g, function (o, i, p) {
    var ret = null;
    datas.some(function (data) {
      if (p in data && typeof data[p] === 'string') ret = data[p];
      return ret !== null;
    });
    if (ret) {
      if (i[0] === '{') return fillStr.bind(this, ret).apply(null, datas);
      if (i[0] === '[') return escapeXml(ret);
    }
    return ret || o;
  });
};

// 设置项
var config = function (uid) {
  var config = {}, storageKey = 'user' + uid + 'config';
  var onputs = [];
  // 写入到内存
  var put = function (key, value) {
    onputs.map(function (f) { f(key, value, config[key]); });
    config[key] = value;
    return value;
  };
  // 从内存读取
  var get = function (key, value, type) {
    if (!(key in config)) return value;
    var val = config[key];
    if (typeof val === 'undefined') return value;
    if (type && (val === null || val.constructor !== type)) return value;
    return val;
  };
  // 读取到内存
  var read = function () {
    try { config = JSON.parse(GM_getValue(storageKey, '{}')); }
    catch (e) { config = {}; }
  };
  // 从内存写出
  var write = function () {
    GM_setValue(storageKey, JSON.stringify(config));
  };
  // 当内存配置被修改时调用
  var onput = function (f) {
    onputs.push(f);
  };
  // 初始化
  read();
  return {
    'put': put,
    'get': get,
    'read': read,
    'write': write,
    'onput': onput,
    'uid': uid,
  };
};

var debug = console.log.bind(console);

// 显示右上角过滤器图标
var showIcon = function () {
  var p = document.querySelector('.WB_global_nav .gn_person');
  if (!p) return setTimeout(showIcon, 100);
  var d = document.createElement('div');
  d.innerHTML = html.icon;
  p.appendChild(d.firstChild);
  var f = document.querySelector('.gn_filter');
  f.addEventListener('click', function (e) {
    filters.showDialog();
    e.preventDefault();
  });
};

// 显示一个对话框
var Dialog = function (id, fillFun) {
  var dialog;
  var STK = unsafeWindow.STK;
  if (!STK) return false;
  dialog = STK.ui.dialog({ 'id': id });
  dialog.setTitle(text.configDialogTitle);
  fillFun(dialog.getOuter().querySelector('[node-type="inner"]'));
  return dialog;
};

// 延迟调用函数
var call = function (f) {
  setTimeout.bind(this, f, 0).apply(null, Array.apply(Array, arguments).slice(1));
};

// 套上try-catch
var withTry = function (f, fc) {
  return function () {
    try { f.apply(this, arguments); }
    catch (e) {
      console.warn('Exception while run %o: %o (%o)', f, e, e.stack);
      if (fc) fc(e);
    }
  };
};

// 管理样式
var css = (function () {
  var styleText = '';
  var fun = function (css) {
    return function (conf) { if (conf) styleText += css + '\n'; }
  };
  fun.init = function () { GM_addStyle(styleText); }
  fun.add = function (css) { styleText += css + '\n'; }
  return fun;
}());

// 产生一个假的回调函数
var fakeCallback = (function () {
  var last = 0;
  return function () {
    return 'STK_' + (last = Math.max(last + 1, Number(new Date())));
  };
}());

// 维护账号信息，用于显示
var account = (function () {
  var idCache = {}, nameCache = {};
  var request = function (queryStr, onsucc, onerror) {
    GM_xmlhttpRequest({
      'method': 'GET',
      'url': fillStr(url.newcard, { 'query': queryStr, 'callback': fakeCallback() }),
      'onload': withTry(function (resp) {
        var respJson = JSON.parse(resp.responseText.replace(/^try{[^{]*\(/, '').replace(/\)}catch\(e\){};$/, ''));
        var namecard = document.createElement('div'); namecard.innerHTML = respJson.data;
        var avatar = namecard.querySelector('.name dt img').getAttribute('src');
        var name = namecard.querySelector('.name dd a[uid]').getAttribute('title');
        var uid = namecard.querySelector('.name dd a[uid]').getAttribute('uid');
        var data = { 'avatar': avatar, 'id': uid, 'name': name };
        nameCache[name] = idCache[uid] = data;
        onsucc(data);
      }, onerror),
      'onerror': function () { onerror(); },
    });
    return queryStr
  };
  var byId = function (id, onsucc, onerror) {
    if (idCache[id]) onsucc(idCache[id]);
    else request('id=' + id, onsucc, onerror);
  };
  var byName = function (name, onsucc, onerror) {
    if (nameCache[name]) onsucc(nameCache[name]);
    else request('name=' + name, onsucc, onerror);
  };
  return { 'id': byId, 'name': byName };
}());

// 过滤器管理器
var filters = (function () {
  var list = [], preinit = true;
  var add = function (details) {
    list.push(details);
    if (!preinit) details.init();
    return details;
  };
  var init = function () {
    list.forEach(function (x) { x.init(); });
    preinit = false;
  };
  var dialog = null;
  var dialogButton = function (dialog, inner) {
    var applyButton = inner.querySelector('[action-type="apply"]');
    var saveButton = inner.querySelector('[action-type="save"]');
    var cancelButton = inner.querySelector('[action-type="cancel"]');
    config.onput(function () {
      applyButton.className = 'W_btn_b';
    });
    applyButton.addEventListener('click', function () {
      if (applyButton.classList.contains('W_btn_b_disable')) return;
      config.write();
      applyButton.className = 'W_btn_b W_btn_b_disable';
    });
    saveButton.addEventListener('click', function () {
      config.write();
      dialog.hide();
    });
    cancelButton.addEventListener('click', function () {
      config.read();
      dialog.hide();
    });
  };
  var lastTab = 0;
  var dialogTabs = function (list, inner, page) {
    var alist = Array.apply(Array, inner.querySelectorAll('.yawcf-config-header a'));
    var llist = Array.apply(Array, inner.querySelectorAll('.yawcf-config-body .yawcf-config-layer'))
    var choseLList = function (i) {
      llist.forEach(function (l) { l.style.display = 'none'; });
      alist.forEach(function (a) { a.classList.remove('current'); a.classList.remove('S_bg5'); a.classList.add('S_bg1'); });
      llist[i].innerHTML = ''; list[i].show(llist[i]); llist[i].style.display = 'block';
      alist[i].classList.add('current'); alist[i].classList.remove('S_bg1'); alist[i].classList.add('S_bg5');
      lastTab = i;
    };
    list.map(function (filter, i) {
      var l = llist[i], a = alist[i];
      a.addEventListener('click', function () { choseLList(i); });
      a.addEventListener('keydown', function () { choseLList(i); });
    });
    choseLList(page);
  };
  var showDialog = function (page, count) {
    var showDialogInner = function (inner) {
      inner.innerHTML = [html.configHeaderTop,
        list.map(function (filter, index) {
          return fillStr(html.configHeaderItem, {
            'name': text[filter.name + 'Title'],
            'aclass': index === 0 ? 'S_bg5 current' : 'S_bg1',
            'liclass': index === list.length - 1 ? 'pftb_itm_lst' : ' ',
          });
        }).join(''),
        html.configHeaderBottom,
        html.configLayerTop,
        list.map(function (filter, index) {
          return fillStr(html.configLayerItem, {
            'name': filter.name + 'Layer',
          });
        }).join(''),
        html.configLayerBottom,
        html.configFooter,
      ].join('');
      call(function () {
        dialogButton(dialog, inner);
        dialog.show().setPosition({
          't': unsafeWindow.STK.core.util.scrollPos().top + 50,
          'l': (unsafeWindow.STK.core.util.winSize().width - dialog.getSize().w) >> 1,
        });
      });
      if (list.indexOf(page) === -1) dialogTabs(list, inner, lastTab);
      else dialogTabs(list, inner, list.indexOf(page));
    };
    if (!(dialog = Dialog('yawcf-config', showDialogInner))) {
      if (!count || count < 100)
        setTimeout(showDialog, 100, page, (count || 0) + 1);
      else debug('STK not loaded');
    }
  };
  return {
    'add': add,
    'init': init,
    'showDialog': showDialog,
  }
}());

// 检查是否有新的节点
var newNode = (function () {
  var callbacks = [], actived = false;
  var callAll = function () {
    callbacks.forEach(function (c) { try { c(); } catch (e) { } }); 
  };
  var observe = function () {
    callAll();
    (new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) { callAll(); });
    })).observe(document.body, { 'childList': true, 'subtree': true });
  };
  var add = function (callback) {
    callbacks.push(callback);
    return callback;
  };
  var active = function () {
    if (actived) return;
    actived = true;
    observe();
  };
  return {
    'add': add,
    'active': active,
  };
}());

// 逐条进行过滤
var weiboFilter = newNode.add(function () {
  var feeds = Array.apply(Array,
    document.querySelectorAll('.WB_feed>.WB_feed_type:not([yawcf-display])'));
  feeds.forEach(function (feed) {
    // 同源合并的微博
    var sonFeeds = Array.apply(Array, feed.querySelectorAll('.WB_feed_type:not([yawcf-display])'));
    var parentAction = null;
    while (parentAction === null) {
      var action = rules.parse(feed) || 'show';
      // 如果父微博被屏蔽，那么就把下面一条没被屏蔽的拉上来换个位置
      if (action === 'hidden' && sonFeeds.length) {
        (function (p, s) {
          var x = document.createElement('div');
          ['.WB_face', '.WB_info', '.WB_text', '.WB_func'].map(function (q) {
            (function (a, b) {
              b.parentNode.replaceChild(x, b);
              a.parentNode.replaceChild(b, a);
              x.parentNode.replaceChild(a, x);
            }(p.querySelector(q), s.querySelector(q)));
          });
          var mid = p.getAttribute('mid');
          p.setAttribute('mid', s.getAttribute('mid'));
          s.setAttribute('mid', mid);
          s.setAttribute('yawcf-display', 'hidden');
          // 各种细节的修补（原网站做的太乱了……）
          var pf = p.querySelector('.WB_face'), sf = s.querySelector('.WB_face');
          var pfa = pf.querySelector('a'), pfi = pf.querySelector('img');
          var sfa = sf.querySelector('a'), sfi = sf.querySelector('img');
          if (pfa.href.indexOf('?') === -1) pfa.href += '?from=feed&loc=avatar';
          if (sfa.href.indexOf('?') !== -1) sfa.href = sfa.href.slice(0, sfa.href.indexOf('?'));
          if (!pfa.title) pfa.title = pfi.title;
          if (sfa.title) sfa.removeAttribute('title');
          sfi.width = sfi.height = '30'; pfi.width = pfi.height = '50';
        }(feed, sonFeeds.shift()));
      } else parentAction = action;
    }
    feed.setAttribute('yawcf-display', parentAction);
    // 最后处理所有下面的子微博
    sonFeeds.forEach(function (feed) {
      var action = rules.parse(feed) || 'show';
      feed.setAttribute('yawcf-display', action);
    });
    // 如果有一个微博的子微博都隐藏了，那么就隐藏这个微博的子微博框
    if (feed.querySelector('.WB_feed_together')) (function () {
      var sonCount = feed.querySelectorAll('.WB_feed_together .WB_sonFeed .WB_feed_type[yawcf-display="show"]').length;
      if (sonCount === 0) feed.querySelector('.WB_feed_together').setAttribute('yawcf-display', 'hidden');
      else feed.querySelector('[node-type="followNum"]').textContent = sonCount;
      if (sonCount <= 3 && feed.querySelector('[node-type="feed_list_wrapForward"]')) {
        feed.querySelector('.WB_feed_together').setAttribute('yawcf-fold', 'display');
      }
    }());
  });
});

/*
// 当有新微博时先把他们显示出来，看看都是什么，再给用户显示
var newBarRedraw = newNode.add(function () {

});
*/

var typedConfig = (function () {
  // 字符串
  var strings = function (item) {
    if (!item.getconf) item.getconf = function () {
      return item.conf = config.get(item.key, item['default'] || [], Array);
    };
    if (!item.setconf) item.setconf = function (conf) {
      return config.put(item.key, item.conf = conf);
    };
  };
  // 布尔值
  var boolean = function (item) {
    if (!item.getconf) item.getconf = function () {
      return item.conf = config.get(item.key, item['default'] || false, Boolean);
    };
    if (!item.setconf) item.setconf = function (conf) {
      return config.put(item.key, item.conf = conf);
    };
  }
  return {
    'strings': strings,
    'boolean': boolean,
    'users': strings,
  }
}());

// 根据不同类型生成带有事件的文档节点
var typedHtml = (function () {
  var cewih = function (tag, inner) {
    var d = document.createElement(tag);
    d.innerHTML = inner;
    return d;
  };

  // 副标题
  var subtitle = function (item) {
    return cewih('div', fillStr(html.configSubtitle, item)).firstChild;
  };

  // 文本
  var text = function (item) {
    return cewih('div', fillStr(html.configText, item)).firstChild;
  };

  // 直接被嵌入的HTML
  var _html = function (item) {
    if (item.constructor === String) return cewih('div', fillStr(item.html)).firstChild;
    else if (item instanceof Node) return item.hmtl;
    else return null;
  };

  // 真假值的设置项
  var boolean = function (item) {
    var dom = cewih('div', fillStr(html.configBoolean, item)).firstChild;
    var input = dom.querySelector('input');
    input.checked = item.getconf();
    input.addEventListener('change', function () {
      item.setconf(input.checked);
    });
    return dom;
  };

  // 字符串数组设置项模板
  var items = function (base, genli, item) {
    var dom = cewih('div', fillStr(base, item)).firstChild;
    var form = dom.querySelector('form'), input = dom.querySelector('input'), ul = dom.querySelector('ul');
    var shown = {};
    // 将某个已经有的字符串显示到末尾
    var moveToEnd = function (x) {
      var p = x.parentNode; p.appendChild(p.removeChild(x));
    };
    // 显示一个新的字符串
    var showStrings = function (userinput, str, onsucc, ondone) {
      genli(item, userinput, str, function (str, li) {
        if (ondone) ondone();
        console.log('str: %o', str);
        if (!str || !li) return;
        if (shown[str]) return moveToEnd(shown[str]);
        var del = li.querySelector('a.icon_close');
        del.addEventListener('click', function () {
          delete shown[str];
          if (item.del) item.del(str);
          li.parentNode.removeChild(li);
          item.setconf(item.getconf().filter(function (x) { return x !== str; }));
        });
        ul.appendChild(shown[str] = li);
        if (onsucc) onsucc(str);
      });
    };
    item.getconf().forEach(function (str) { showStrings(false, str); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var str = input.value;
      input.disabled = true;
      if (!str) return;
      showStrings(true, str, function (str) {
        item.getconf();
        item.conf.push(str);
        item.setconf(item.conf);
      }, function () {
        input.value = '';
        input.disabled = false;
      });
    });
    return dom;
  };

  // 字符串设置项
  var strings = items.bind(null, html.configStrings, function (item, userinput, str, callback) {
    if (userinput && item.add && !(str = item.add(str))) callback();
    else callback(str, cewih('ul', fillStr(html.configStringsItem, { 'item': item.display ? item.display(str) : str })).firstChild);
  });

  // 用户列表的设置项
  var users = items.bind(null, html.configUsers, function (item, userinput, str, callback) {
    var showUserNotExistError = function () {
      var msg = fillStr('{{{accountNotExistError}}}', { 'name': escapeXml(str) });
      unsafeWindow.STK.ui.alert(msg, {
        'title': fillStr('{{accountNotExistErrorTitle}}'),
        'icon': 'error',
        'msg': msg,
      });
      callback();
    };
    if (userinput) {
      if (!(str = str.trim().replace(/^@/, ''))) return;
      account.name(str, function (info) {
        if (!info) showUserNotExistError();
        else if (item.add && !item.add(info)) callback();
        else callback(info.id, cewih('ul', fillStr(html.configUsersItem, info)).firstChild);
      }, showUserNotExistError);
    } else {
      var emptyInfo = { 'id': str, 'name': ' ', 'avatar': ' ' };
      var li = cewih('ul', fillStr(html.configUsersItem, emptyInfo)).firstChild;
      callback(str, li);
      account.id(str, function (info) {
        var u = li.querySelector('[uid]');
        u.setAttribute('uid', info.id); u.setAttribute('title', info.name); u.textContent = info.name;
        var p = li.querySelector('.pic img');
        p.src = info.avatar;
      });
    }
  });

  return {
    'subtitle': subtitle,
    'text': text,
    'html': _html,
    'strings': strings,
    'boolean': boolean,
    'users': users,
  };
}());

// 过滤器组
var filterGroup = function (groupName) {
  var items = [];
  // 向过滤器组里面添加一个项目
  var add = function (item) { items.push(item); };
  // 网页被初始化时初始化所有过滤器
  var init = function () {
    items.forEach(withTry(function (item) {
      if (item.type && typedConfig[item.type]) typedConfig[item.type](item);
      if (item.getconf) item.getconf();
      if (item.init) item.init(item.conf);
      if (item.rule) rules.add(item.priority || 0, item.rule.bind(item));
    }));
  };
  // 需要显示选项时生成界面
  var show = function (inner) {
    items.forEach(withTry(function (item) {
      var dom = null;
      if (item.show) dom = item.show(dom);
      else if (item.type && typedHtml[item.type])
        dom = typedHtml[item.type](item);
      if (dom) inner.appendChild(dom);
    }));
  };
  // 注册到过滤器分组
  var group = {
    'name': groupName,
    'show': show,
    'init': init,
    'add': add
  };
  return filters.add(group);
};

var weiboContentSelector = function (feed, f) {
  var content = feed.querySelector('[node-type="feed_list_content"]');
  var reason = feed.querySelector('[node-type="feed_list_reason"] em');
  var items = [];
  if (content) items = items.concat(Array.apply(Array, f(content)));
  if (reason) items = items.concat(Array.apply(Array, f(reason)));
  return items;
};

// 关键字过滤
var keywordFilterGroup = filterGroup('keywordFilterGroup');

keywordFilterGroup.add({
  'type': 'subtitle',
  'text': '{{keywordFilterBlacklist}}',
});

// 检查某个微博里面是否有关键字列表中的关键字
var keywordMatch = function (keywords, feed) {
  var texts = weiboContentSelector(feed, function (m) {
    return Array.apply(Array, m.childNodes)
      .filter(function (node) { return node.nodeType === Node.TEXT_NODE; })
      .map(function (node) { return node.textContent; });
  }).join(' ').toUpperCase();
  return keywords.some(function (keyword) { return texts.indexOf(keyword.toUpperCase()) !== -1; });
};

// 关键字屏蔽
keywordFilterGroup.add({
  'type': 'strings',
  'key': 'weibo.blacklist',
  'text': '{{keywordFilterDesc}}',
  'add': function (s) { return s.trim(); },
  'rule': function keywordFilterBlacklistRule(feed) {
    return keywordMatch(this.conf, feed) ? 'hidden' : null;
  },
});

// 按照正则式过滤
var regexpFilterGroup = filterGroup('regexpFilterGroup');

regexpFilterGroup.add({
  'type': 'subtitle',
  'text': '{{regexpFilterBlacklist}}',
});

// 检查某个微博里面是否会匹配某个正则式
var regexpMatch = function (regexen, feed) {
  var texts = weiboContentSelector(feed, function (m) {
    return Array.apply(Array, m.childNodes)
      .filter(function (node) { return node.nodeType === Node.TEXT_NODE; })
      .map(function (node) { return node.textContent; });
  }).join(' ');
  return regexen.some(function (regexp) {
    return !!(RegExp(regexp).exec(texts));
  });
};

// 正则式匹配
regexpFilterGroup.add({
  'type': 'strings',
  'key': 'weibo.regexpblacklist',
  'text': '{{regexpFilterDesc}}',
  'add': function (s) {
    s = s.trim();
    if (s[0] === '/' && s[s.length - 1] === '/') s = s.slice(1, -1);
    return s;
  },
  'display': function (s) { return '/' + s + '/'; },
  'rule': function regexpFilterBlacklistRule(feed) {
    return regexpMatch(this.conf, feed) ? 'hidden' : null;
  },
});

regexpFilterGroup.add({
  'type': 'text',
  'text': '{{regexpFilterRemark}}',
});

// 原创用户过滤
var originalFilterGroup = filterGroup('originalFilterGroup');

originalFilterGroup.add({
  'type': 'subtitle',
  'text': '{{originalFilterBlacklist}}',
});

var originalMatch = function (originals, feed) {
  var originalAuthor = feed.querySelector('.WB_media_expand .WB_info .WB_name');
  if (!originalAuthor) return false;
  var id = originalAuthor.getAttribute('usercard').split('=')[1];
  console.log('id: %d, originals: %o', id, originals);
  return originals.some(function (x) { return x === id; });
};


originalFilterGroup.add({
  'type': 'users',
  'key': 'weibo.oriblacklist',
  'text': '{{originalFilterDesc}}',
  'rule': function originalFilterBlacklistRule(feed) {
    return originalMatch(this.conf, feed) ? 'hidden' : null;
  },
});

// 提到某人的微博
var mentionFilterGroup = filterGroup('mentionFilterGroup');

mentionFilterGroup.add({
  'type': 'subtitle',
  'text': '{{mentionFilterBlacklist}}',
});

var mentionMatch = function (mentions, feed) {
  var links = weiboContentSelector(feed, function (m) {
    return Array.apply(Array, m.querySelectorAll('a[usercard^="name="][href$="loc=at"]'));
  });
  return links.some(function (link) {
    var name = link.getAttribute('usercard').slice('name='.length);
    return mentions.some(function (x) { return x === name; });
  });
};

mentionFilterGroup.add({
  'type': 'strings',
  'key': 'weibo.mentionblacklist',
  'text': '{{mentionFilterDesc}}',
  'add': function (s) { return s.trim().replace(/^@/, ''); },
  'display': function (s) { return '@' + s; },
  'rule': function mentionFilterBlacklistRule(feed) {
    return mentionMatch(this.conf, feed) ? 'hidden' : null;
  },
});


// 话题过滤
var topicFilterGroup = filterGroup('topicFilterGroup');

topicFilterGroup.add({
  'type': 'subtitle',
  'text': '{{topicFilterBlacklist}}',
});

var topicMatch = function (topics, feed) {
  var list = weiboContentSelector(feed, function (m) {
    return Array.apply(Array, m.querySelectorAll('.a_topic'));
  });
  var text = list.map(function (x) { return x.textContent; }).join('##');
  return topics.some(function (topic) { return text.indexOf(topic) !== -1; });
}

// 屏蔽话题
topicFilterGroup.add({
  'type': 'strings',
  'key': 'weibo.topics',
  'text': '{{topicFilterDesc}}',
  'add': function (s) { return s.trim().replace(/#/g, ''); },
  'display': function (s) { return '#' + s + '#'; },
  'rule': function topicFilterBlacklistRule(feed) {
    return topicMatch(this.conf, feed) ? 'hidden' : null;
  },
});

// 来源过滤
var sourceFilterGroup = filterGroup('sourceFilterGroup');

sourceFilterGroup.add({
  'type': 'subtitle',
  'text': '{{sourceFilterBlacklist}}',
});

// 屏蔽来源
var sourceMatch = function (sources, feed) {
  var st = feed.querySelector('[node-type="feed_list_funcLink"] [action-type="app_source"]');
  if (!st || !st.textContent) return false;
  return sources.some(function (source) { return st.textContent.indexOf(source) !== -1; });
}

sourceFilterGroup.add({
  'type': 'strings',
  'key': 'weibo.sources',
  'text': '{{sourceFilterDesc}}',
  'add': function (s) {
    s = s.trim();
    if (s === '微博 weibo.com') {
      unsafeWindow.STK.ui.alert(fillStr('{{sourceFilterWarning}}'), {
        'title': fillStr('{{sourceFilterWarningTitle}}'),
        'icon': 'error',
        'msg': fillStr('{{sourceFilterWarning}}'),
      });
      s = null;
    }
    return s;
  },
  'rule': function sourceFilterBlacklistRule(feed) {
    return sourceMatch(this.conf, feed) ? 'hidden' : null;
  },
});

var otherFilterGroup = filterGroup('otherFilterGroup');

// 推广微博
otherFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.ad_feed',
  'default': true,
  'text': '{{adfeedFilterDesc}}',
  'rule': function adFeedFilterRule(feed) {
    if (!this.conf) return null;
    return feed.getAttribute('feedtype') === 'ad' ? 'hidden' : null;
  },
});

// 推荐微博
otherFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.adblock',
  'default': true,
  'text': '{{recommandFeedDesc}}',
  'init': css('[node-type="feed_list_recommend"] { display: none !important; }'),
});

// 关注推荐微博
otherFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.follow_suggest',
  'default': true,
  'text': '{{followSuggestFilterDesc}}',
  'rule': function followSuggestFilterRule(feed) {
    if (!this.conf) return null;
    return feed.querySelector('a[href$="/find/i"]') ? 'hidden' : null;
  },
});

var layoutFilterGroup = filterGroup('layoutFilterGroup');

// 去广告
layoutFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.adblock',
  'default': true,
  'text': '{{adBlockDesc}}',
  'init': css(funcStr(function (conf) { /*!CSS
    #wrapAD { visibility: hidden !important; }
    [id^="sinaadToolkitBox"] { display: none !important; }
    .news_logo { visibility: hidden !important; }
  */ })),
});

// 中栏顶部推荐
layoutFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.toprecom',
  'default': false,
  'text': '{{topRecomBlockDesc}}',
  'init': css('#pl_content_toprecom { display: none !important; }'),
});

// 改造设置
var toolFilterGroup = filterGroup('toolFilterGroup');
toolFilterGroup.add({ 'type': 'text', 'text': '// TODO' });

// 脚本设置
var scriptFilterGroup = filterGroup('scriptFilterGroup');
scriptFilterGroup.add({ 'type': 'text', 'text': '// TODO' });

scriptFilterGroup.add({
  'init': function () {
    css.add(fillStr(funcStr(function () { /*!CSS
      .profile_tab .pftb_lk { padding-left: {{width}}; padding-right: {{width}}; }
      .profile_tab .current.pftb_lk { padding-left: calc({{width}} - 3px); padding-right: calc({{width}} - 3px); }
    */ }), { 'width': i18n.lang === 'en' ? '8px' : '12px' }));
  },
});

// 检查是否要在本页上运行
var validPage = function () {
  if (self !== top) return false;
  if (!unsafeWindow.$CONFIG.uid) return false;
  if (!unsafeWindow.$CONFIG.lang) return false;
  return true;
};

// 完成加载时
var dcl = function () {
  if (!validPage()) return;
  // 初始化用户语言
  i18n.setLang(unsafeWindow.$CONFIG.lang);
  // 加载用户配置
  config = config(unsafeWindow.$CONFIG.uid);
  // 初始化文本和网页数据（基于用户选择的语言）
  Object.keys(text).map(function (key) { i18n(text[key]); text[key] = text[key].local; });
  Object.keys(html).map(function (key) { html[key] = fillStr(html[key]); });
  // 显示设置按钮
  showIcon();
  // 初始化所有过滤器
  filters.init();
  // 注册样式
  css.init();
  // 开始过滤
  newNode.active();
};
if (document.body) call(dcl);
else document.addEventListener('DOMContentLoaded', dcl);

GM_addStyle(fillStr((funcStr(function () { /*!CSS
  // 在顶部添加按钮
  .gn_setting[node-type="member"]:last-child { margin-right: 44px; }
  .WB_global_nav .gn_setting .gn_tab.gn_filter .ico { background-image: url("{{filter-img}}"); !important; background-position: 0 0 !important; }
  .WB_global_nav .gn_search { width: 210px !important; }
  .WB_global_nav .gn_search .gn_input { width: 168px !important; }
  // 设置框相关样式
  #yawcf-config [node-type="inner"] { padding: 20px; }
  .yawcf-config-body { width: 600px; }
  #yawcf-config .profile_tab { font-size: 12px; margin: -20px -20px 20px; width: 640px; }
  .yawcf-groupSubtitle { font-weight: bold; padding: 6px 10px; }
  .yawcf-configStrings, .yawcf-configBoolean, .yawcf-configUsers { margin: 2px 20px; }
  .yawcf-configStringsInput, .yawcf-configUsersInput { margin: 5px; }
  .yawcf-configStringsItems, .yawcf-configUsersItems { padding: 5px 10px; }
  .yawcf-configStringsItem, .yawcf-configUsersItem { display: inline-block; margin: 0 2px; }
  .yawcf-configStringsItem a.icon_close,
  .yawcf-configUsersItem a.icon_close { margin-left: 3px; vertical-align: -2px; }
  .yawcf-configUsersItem .shield_object_card { display: inline-block; }
  .yawcf-configUsersItem .shield_object_card .card_bg { border: 1px solid #e6e6e6; border-radius: 2px; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.02); padding: 1px 5px 1px 1px; }
  .yawcf-configUsersItem .shield_object_card .card_pic { float: left; width: 50px; }
  .yawcf-configUsersItem .shield_object_card .card_pic .pic_box { display: block; }
  .yawcf-configUsersItem .shield_object_card .card_content { margin-left: 60px; }
  .yawcf-configUsersItem .shield_object_card .object_info { height: 22px; margin-top: 2px; }
  .yawcf-configUsersItem .shield_object_card .object_name { line-height: 22px; overflow: hidden; }
  .yawcf-configUsersItem .shield_object_card .other_info { line-height: 24px; }
  #yawcf-config .btn { border-top: 1px solid #ccc; margin: 15px 0 0; padding: 10px 0 0; }
  #yawcf-config .btn .W_btn_b_disable:hover { border-color: #d9d9d9; }
  #yawcf-config .btn .W_btn_b_disable:hover span { border-color: #ffffff; }
  // 隐藏微博
  [yawcf-display="hidden"] { display: none !important; }
  .WB_feed>.WB_feed_type:not([yawcf-display]), .WB_feed>.WB_feed_type .WB_feed_type:not([yawcf-display]) { visibility: hidden !important; }
  .WB_feed_together[yawcf-fold="display"] .wft_users { display: none; }
  .WB_feed_together[yawcf-fold="display"] [node-type="feed_list_wrapForward"] { display: block !important; }
  .WB_feed_together[yawcf-fold="display"] [action-type="feed_list_seeAll"],
  .WB_feed_together[yawcf-fold="display"] [action-type="feed_list_foldForward"] { display: none !important; }
  // [node-type="feed_list_newBar"]:not([yawcf-newbar]) { display: none !important; }
*/ }) + '\n').replace(/\/\/.*\n/g, '\n'), {
  'filter-img': images.filter,
}));
