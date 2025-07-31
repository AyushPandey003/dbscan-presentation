#!/usr/bin/env python3
"""
Generate visualizations for DBSCAN case studies and code examples
"""

import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import DBSCAN
from sklearn.datasets import make_moons, make_blobs
from sklearn.preprocessing import StandardScaler
import seaborn as sns

# Set style for better looking plots
plt.style.use('dark_background')
sns.set_palette("viridis")

def generate_moons_clustering():
    """Generate DBSCAN clustering visualization for moons dataset"""
    # Generate sample data
    X, _ = make_moons(n_samples=200, noise=0.05, random_state=42)
    
    # Perform DBSCAN clustering
    dbscan = DBSCAN(eps=0.3, min_samples=5)
    clusters = dbscan.fit_predict(X)
    
    # Create visualization
    plt.figure(figsize=(12, 8))
    
    # Plot clusters
    unique_labels = set(clusters)
    colors = plt.cm.viridis(np.linspace(0, 1, len(unique_labels)))
    
    for k, col in zip(unique_labels, colors):
        if k == -1:
            # Black used for noise
            col = 'red'
            marker = 'x'
            label = 'Noise'
            size = 100
        else:
            marker = 'o'
            label = f'Cluster {k}'
            size = 60
            
        class_member_mask = (clusters == k)
        xy = X[class_member_mask]
        plt.scatter(xy[:, 0], xy[:, 1], c=[col], marker=marker, 
                   s=size, label=label, alpha=0.8, edgecolors='white', linewidth=1)
    
    plt.title("DBSCAN Clustering of Moons Dataset", fontsize=16, fontweight='bold')
    plt.xlabel("Feature 1", fontsize=14)
    plt.ylabel("Feature 2", fontsize=14)
    plt.legend(fontsize=12)
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    
    # Save the plot
    plt.savefig('dbscan_moons_clustering.png', dpi=300, bbox_inches='tight', 
                facecolor='black', edgecolor='none')
    plt.close()
    
    print("Generated: dbscan_moons_clustering.png")

def generate_anomaly_detection():
    """Generate DBSCAN anomaly detection visualization"""
    # Generate sample data with outliers
    centers = [[1, 1], [-1, -1]]
    X, _ = make_blobs(n_samples=750, centers=centers, cluster_std=0.4, random_state=0)
    outliers = np.random.uniform(low=-3, high=3, size=(50, 2))
    X = np.vstack([X, outliers])
    
    # Perform DBSCAN clustering
    dbscan = DBSCAN(eps=0.3, min_samples=10)
    clusters = dbscan.fit_predict(X)
    
    # Create visualization
    plt.figure(figsize=(12, 8))
    
    # Plot non-outlier points
    mask_clusters = clusters != -1
    if np.any(mask_clusters):
        scatter_clusters = plt.scatter(X[mask_clusters, 0], X[mask_clusters, 1], 
                                     c=clusters[mask_clusters], cmap='viridis', 
                                     s=60, label='Clusters', alpha=0.8, 
                                     edgecolors='white', linewidth=0.5)
    
    # Plot outlier points
    mask_outliers = clusters == -1
    if np.any(mask_outliers):
        plt.scatter(X[mask_outliers, 0], X[mask_outliers, 1], 
                   c='red', marker='x', s=100, label='Outliers', 
                   alpha=0.9, linewidth=2)
    
    plt.title("DBSCAN Anomaly Detection", fontsize=16, fontweight='bold')
    plt.xlabel("Feature 1", fontsize=14)
    plt.ylabel("Feature 2", fontsize=14)
    plt.legend(fontsize=12)
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    
    # Save the plot
    plt.savefig('dbscan_anomaly_detection.png', dpi=300, bbox_inches='tight',
                facecolor='black', edgecolor='none')
    plt.close()
    
    # Print results
    n_clusters_ = len(set(clusters)) - (1 if -1 in clusters else 0)
    n_noise_ = list(clusters).count(-1)
    print(f"Generated: dbscan_anomaly_detection.png")
    print(f'Estimated number of clusters: {n_clusters_}')
    print(f'Estimated number of noise points: {n_noise_}')

def generate_customer_segmentation():
    """Generate customer segmentation visualization"""
    # Generate synthetic customer data
    np.random.seed(42)
    
    # Create different customer segments
    # High-value customers
    high_value = np.random.multivariate_normal([8, 7], [[1, 0.5], [0.5, 1]], 100)
    # Budget-conscious customers
    budget = np.random.multivariate_normal([3, 2], [[0.5, 0], [0, 0.5]], 150)
    # Occasional buyers
    occasional = np.random.multivariate_normal([5, 4], [[2, 0.5], [0.5, 2]], 80)
    # Add some outliers (fraud/unusual behavior)
    outliers = np.random.uniform(0, 10, (20, 2))
    
    # Combine all data
    X = np.vstack([high_value, budget, occasional, outliers])
    
    # Apply DBSCAN
    dbscan = DBSCAN(eps=1.2, min_samples=8)
    clusters = dbscan.fit_predict(X)
    
    # Create visualization
    plt.figure(figsize=(12, 8))
    
    # Define cluster labels
    cluster_names = {
        0: 'High-Value Customers',
        1: 'Budget-Conscious',
        2: 'Occasional Buyers',
        -1: 'Outliers/Fraud'
    }
    
    # Plot clusters
    unique_labels = set(clusters)
    colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728']
    
    for i, k in enumerate(unique_labels):
        if k == -1:
            # Red X for outliers
            col = colors[3]
            marker = 'x'
            size = 100
        else:
            col = colors[k % len(colors)]
            marker = 'o'
            size = 60
            
        class_member_mask = (clusters == k)
        xy = X[class_member_mask]
        
        label = cluster_names.get(k, f'Cluster {k}')
        plt.scatter(xy[:, 0], xy[:, 1], c=[col], marker=marker, 
                   s=size, label=label, alpha=0.8, edgecolors='white', linewidth=1)
    
    plt.title("Customer Segmentation using DBSCAN", fontsize=16, fontweight='bold')
    plt.xlabel("Purchase Frequency", fontsize=14)
    plt.ylabel("Average Spending", fontsize=14)
    plt.legend(fontsize=12)
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    
    # Save the plot
    plt.savefig('dbscan_customer_segmentation.png', dpi=300, bbox_inches='tight',
                facecolor='black', edgecolor='none')
    plt.close()
    
    print("Generated: dbscan_customer_segmentation.png")

def generate_wine_anomaly_detection():
    """Generate wine dataset anomaly detection visualization"""
    # Generate synthetic wine data based on real wine properties
    np.random.seed(42)
    
    # Normal wine clusters
    cluster1 = np.random.multivariate_normal([12, 2.5], [[1, 0.3], [0.3, 0.5]], 80)  # Red wines
    cluster2 = np.random.multivariate_normal([10, 1.8], [[0.8, -0.2], [-0.2, 0.4]], 70)  # White wines
    cluster3 = np.random.multivariate_normal([11, 2.1], [[0.6, 0.1], [0.1, 0.3]], 60)  # Rosé wines
    
    # Anomalous wines
    anomalies = np.array([[15, 4], [8, 0.5], [14, 1], [9, 3.5], [13, 0.8]])
    
    # Combine data
    X = np.vstack([cluster1, cluster2, cluster3, anomalies])
    
    # Apply DBSCAN
    dbscan = DBSCAN(eps=0.8, min_samples=8)
    clusters = dbscan.fit_predict(X)
    
    # Create visualization
    plt.figure(figsize=(12, 8))
    
    # Plot clusters
    unique_labels = set(clusters)
    colors = plt.cm.Set1(np.linspace(0, 1, len(unique_labels)))
    
    for k, col in zip(unique_labels, colors):
        if k == -1:
            col = 'red'
            marker = 'x'
            label = 'Anomalous Wines'
            size = 120
        else:
            marker = 'o'
            label = f'Wine Type {k+1}'
            size = 60
            
        class_member_mask = (clusters == k)
        xy = X[class_member_mask]
        plt.scatter(xy[:, 0], xy[:, 1], c=[col], marker=marker, 
                   s=size, label=label, alpha=0.8, edgecolors='white', linewidth=1)
    
    plt.title("Wine Quality Anomaly Detection using DBSCAN", fontsize=16, fontweight='bold')
    plt.xlabel("Alcohol Content (%)", fontsize=14)
    plt.ylabel("Malic Acid (g/L)", fontsize=14)
    plt.legend(fontsize=12)
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    
    # Save the plot
    plt.savefig('dbscan_wine_anomaly.png', dpi=300, bbox_inches='tight',
                facecolor='black', edgecolor='none')
    plt.close()
    
    print("Generated: dbscan_wine_anomaly.png")

if __name__ == "__main__":
    print("Generating DBSCAN case study visualizations...")
    
    # Generate all visualizations
    generate_moons_clustering()
    generate_anomaly_detection()
    generate_customer_segmentation()
    generate_wine_anomaly_detection()
    
    print("\nAll visualizations generated successfully!")
    print("Files created:")
    print("- dbscan_moons_clustering.png")
    print("- dbscan_anomaly_detection.png") 
    print("- dbscan_customer_segmentation.png")
    print("- dbscan_wine_anomaly.png")
